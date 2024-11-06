using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class TeamsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Team>> GetAllTeams()
    {
        return Ok(new List<Team>());
    }

    [HttpGet("{id}")]
    public ActionResult<Team> GetTeamById(int id)
    {
        // Fetch team by id
        return Ok(new Team());
    }

    [HttpPost]
    public ActionResult<Team> CreateTeam([FromBody] Team newTeam)
    {
        // Create a new team
        return CreatedAtAction(nameof(GetTeamById), new { id = newTeam.Id }, newTeam);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTeam(int id, [FromBody] Team updatedTeam)
    {
        // Update existing team
        if (id != updatedTeam.Id)
        {
            return BadRequest("Team ID mismatch");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTeam(int id)
    {
        // Delete team by id
        return NoContent();
    }
}
