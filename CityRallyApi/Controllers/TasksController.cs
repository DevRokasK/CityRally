using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<Task> GetTaskById(int id)
    {
        return Ok(new Task());
    }

    [HttpPost]
    public ActionResult<Task> CreateTask([FromBody] Task newTask)
    {
        return CreatedAtAction(nameof(GetTaskById), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] Task updatedTask)
    {
        if (id != updatedTask.Id)
        {
            return BadRequest("Task ID mismatch");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        return NoContent();
    }
}
