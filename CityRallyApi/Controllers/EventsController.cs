using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

    [HttpGet]
    public ActionResult<IEnumerable<Event>> GetAllEvents()
    {
        // Fetch all events
        return Ok(new List<Event>());
    }

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
        // Fetch event by id
        return Ok(new Event());
    }

    [HttpPost]
    public ActionResult<Event> CreateEvent([FromBody] Event newEvent)
    {
        // Create a new event
        return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateEvent(int id, [FromBody] Event updatedEvent)
    {
        // Update existing event
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEvent(int id)
    {
        // Delete event by id
        return NoContent();
    }
}
