using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class TeamsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TeamsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public ActionResult<Team> GetTeamById(int id)
    {
        var teamEntity = _context.Teams
         .Include(e => e.Guides)
         .FirstOrDefault(e => e.Id == id);

        if (teamEntity == null)
        {
            return NotFound($"Team with ID {id} not found.");
        }

        return Ok(teamEntity);
    }

    [HttpPost]
    public ActionResult<Team> CreateTeam([FromBody] Team newTeam)
    {
        _context.Teams.Add(newTeam);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTeamById), new { id = newTeam.Id }, newTeam);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTeam(int id, [FromBody] Team updatedTeam)
    {
        var existingTeam = _context.Teams
        .Include(t => t.Guides)
        .FirstOrDefault(t => t.Id == id);

        if (existingTeam == null)
        {
            return NotFound($"Team with ID {id} not found.");
        }

        existingTeam.Title = updatedTeam.Title;

        if (updatedTeam.Guides != null)
        {
            var updatedGuideIds = updatedTeam.Guides.Select(g => g.Id).ToHashSet();

            var guidesToDelete = existingTeam.Guides
                .Where(g => !updatedGuideIds.Contains(g.Id))
                .ToList();

            _context.Guides.RemoveRange(guidesToDelete);

            foreach (var existingGuide in existingTeam.Guides)
            {
                var updatedGuide = updatedTeam.Guides.FirstOrDefault(g => g.Id == existingGuide.Id);
                if (updatedGuide != null)
                {
                    existingGuide.Name = updatedGuide.Name;
                    existingGuide.Email = updatedGuide.Email;
                    existingGuide.Status = updatedGuide.Status;
                }
            }

            var newGuides = updatedTeam.Guides
                .Where(g => g.Id == 0)
                .Select(g => new Guide
                {
                    Name = g.Name,
                    Email = g.Email,
                    Status = g.Status,
                    TeamId = id
                });

            _context.Guides.AddRange(newGuides);
        }

        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTeam(int id)
    {
        var teamEntity = _context.Teams
         .Include(e => e.Guides)
         .FirstOrDefault(e => e.Id == id);

        if(teamEntity == null)
        {
            return NotFound($"Team with ID {id} not found");
        }

        if(teamEntity.Guides != null)
        {
            foreach(var guide in teamEntity.Guides)
            {
                _context.Guides.Remove(guide);
            }
        }

        _context.Teams.Remove(teamEntity);
        _context.SaveChanges();

        return NoContent();
    }
}
