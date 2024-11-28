using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class TeamSubtaskController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TeamSubtaskController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("team/{teamId}")]
    public ActionResult<IEnumerable<TeamSubtask>> GetTeamSubtasksByTeamId(int teamId)
    {
        var teamSubtasks = _context.Team_Subtasks.Where(ts => ts.TeamId == teamId).ToList();

        if (teamSubtasks == null || !teamSubtasks.Any())
        {
            return NotFound(new { message = "No subtasks found for the specified team." });
        }

        return Ok(teamSubtasks);
    }

    [HttpPost]
    public ActionResult AddTeamSubtask(TeamSubtask teamSubtask)
    {
        if (teamSubtask == null)
        {
            return BadRequest(new { message = "Invalid data." });
        }

        _context.Team_Subtasks.Add(teamSubtask);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTeamSubtasksByTeamId), new { teamId = teamSubtask.TeamId }, teamSubtask);
    }

    [HttpDelete("{teamId}/{subtaskId}")]
    public ActionResult DeleteTeamSubtask(int teamId, int subtaskId)
    {
        var teamSubtask = _context.Team_Subtasks.FirstOrDefault(ts => ts.TeamId == teamId && ts.SubtaskId == subtaskId);

        if (teamSubtask == null)
        {
            return NotFound(new { message = "TeamSubtask not found." });
        }

        _context.Team_Subtasks.Remove(teamSubtask);
        _context.SaveChanges();

        return NoContent();
    }
}
