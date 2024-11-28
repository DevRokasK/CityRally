using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public ActionResult<List<EventSummary>> GetAllEventSummaries()
    {
        var eventEntities = _context.Events
            .Include(e => e.Teams)
            .Select(e => new EventSummary
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                PrimaryColor = e.PrimaryColor,
                SecondaryColor = e.SecondaryColor,
                State = e.State,
                TeamCount = e.Teams.Count(),
                TeamIds = e.Teams.Select(t => t.Id).ToList()
            })
            .ToList();

        if (eventEntities == null || !eventEntities.Any())
        {
            return NotFound();
        }

        return Ok(eventEntities);
    }

    [HttpGet("{id}")]
    public ActionResult<Event> GetEventById(int id)
    {
        var eventEntity = _context.Events
        .Include(e => e.Teams)
            .ThenInclude(t => t.Guides)
        .Include(e => e.Tasks)
            .ThenInclude(t => t.Subtasks)
        .FirstOrDefault(e => e.Id == id);

        if (eventEntity == null)
        {
            return NotFound($"Event with ID {id} not found.");
        }

        return Ok(eventEntity);
    }

    [HttpPost]
    public ActionResult<Event> UpsertEvent([FromBody] Event eventDto)
    {
        var existingEvent = _context.Events.FirstOrDefault(e => e.Id == eventDto.Id);

        if (existingEvent != null)
        {
            existingEvent.Title = eventDto.Title;
            existingEvent.Description = eventDto.Description;
            existingEvent.StartDate = eventDto.StartDate;
            existingEvent.EndDate = eventDto.EndDate;
            existingEvent.PrimaryColor = eventDto.PrimaryColor;
            existingEvent.SecondaryColor = eventDto.SecondaryColor;
            existingEvent.State = eventDto.State;

            _context.Events.Update(existingEvent);
            _context.SaveChanges();

            return Ok(existingEvent);
        }
        else
        {
            _context.Events.Add(eventDto);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEventById), new { id = eventDto.Id }, eventDto);
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEvent(int id, [FromBody] Event updatedEvent)
    {
        var existingEvent = _context.Events.Find(id);

        if (existingEvent == null)
        {
            return NotFound($"Event with ID {id} not found.");
        }

        existingEvent.Title = updatedEvent.Title;
        existingEvent.Description = updatedEvent.Description;
        existingEvent.StartDate = updatedEvent.StartDate;
        existingEvent.EndDate = updatedEvent.EndDate;
        existingEvent.PrimaryColor = updatedEvent.PrimaryColor;
        existingEvent.SecondaryColor = updatedEvent.SecondaryColor;
        existingEvent.State = updatedEvent.State;

        _context.Events.Update(existingEvent);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEvent(int id)
    {
        var eventEntity = _context.Events
        .Include(e => e.Tasks)
            .ThenInclude(t => t.Subtasks)
        .Include(e => e.Teams)
            .ThenInclude(t => t.Guides)
        .FirstOrDefault(e => e.Id == id);

        if (eventEntity == null)
        {
            return NotFound($"Event with ID {id} not found.");
        }

        if (eventEntity.Tasks != null)
        {
            foreach (var task in eventEntity.Tasks)
            {
                if (task.Subtasks != null)
                {
                    foreach (var subtask in task.Subtasks)
                    {
                        _context.Subtasks.Remove(subtask);
                    }
                }
                _context.Tasks.Remove(task);
            }
        }

        if (eventEntity.Teams != null)
        {
            foreach (var team in eventEntity.Teams)
            {
                _context.Teams.Remove(team);
            }
        }

        _context.Events.Remove(eventEntity);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPut("update-state")]
    public IActionResult UpdateEventState()
    {
        var now = DateTime.UtcNow;

        var eventsToUpdate = _context.Events
            .Where(e => (e.StartDate < now && e.EndDate > now && e.State == EventStatus.Created) ||
                        (e.EndDate < now && e.State != EventStatus.Closed))
            .ToList();

        foreach (var eventEntity in eventsToUpdate)
        {
            if (eventEntity.StartDate < now && eventEntity.EndDate > now && eventEntity.State == EventStatus.Created)
            {
                eventEntity.State = EventStatus.Started;
            }
            else if (eventEntity.EndDate < now && (eventEntity.State != EventStatus.Closed && eventEntity.State != EventStatus.Draft))
            {
                eventEntity.State = EventStatus.Closed;
            }
        }

        _context.SaveChanges();

        return NoContent();
    }
}
