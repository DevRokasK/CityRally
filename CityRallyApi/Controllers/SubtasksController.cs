using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class SubtasksController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Subtask>> GetAllSubtasks()
    {
        return Ok(new List<Subtask>());
    }

    [HttpGet("{id}")]
    public ActionResult<Subtask> GetSubtaskById(int id)
    {
        // Fetch subtask by id
        return Ok(new Subtask());
    }

    [HttpPost]
    public ActionResult<Subtask> CreateSubtask([FromBody] Subtask newSubtask)
    {
        // Create a new subtask
        return CreatedAtAction(nameof(GetSubtaskById), new { id = newSubtask.Id }, newSubtask);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateSubtask(int id, [FromBody] Subtask updatedSubtask)
    {
        // Update existing subtask
        if (id != updatedSubtask.Id)
        {
            return BadRequest("Subtask ID mismatch");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteSubtask(int id)
    {
        // Delete subtask by id
        return NoContent();
    }
}
