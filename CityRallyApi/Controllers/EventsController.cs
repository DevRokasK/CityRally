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

    //[HttpGet]
    //public ActionResult<IEnumerable<Event>> GetAllEvents()
    //{
    //    var events = _context.Events
    //    .Include(e => e.Teams)
    //        .ThenInclude(t => t.Guides)
    //    .Include(e => e.Tasks)
    //        .ThenInclude(t => t.Subtasks)
    //    .ToList();

    //    if (events == null || !events.Any())
    //    {
    //        return NotFound("No events found.");
    //    }

    //    return Ok(events);
    //}

    [HttpGet("summary")]
    public ActionResult<List<EventSummary>> GetAllEventSummaries()
    {
        var eventEntities = _context.Events
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
                TeamCount = _context.Teams.Count(t => t.EventId == e.Id)
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
    public ActionResult<Event> CreateEvent([FromBody] Event newEvent)
    {
        _context.Events.Add(newEvent);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
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
            .Include(e => e.Teams)
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
}
