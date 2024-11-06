using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Task>> GetAllTasks()
    {
        return Ok(new List<Task>());
    }

    [HttpGet("{id}")]
    public ActionResult<Task> GetTaskById(int id)
    {
        // Fetch task by id
        return Ok(new Task());
    }

    [HttpPost]
    public ActionResult<Task> CreateTask([FromBody] Task newTask)
    {
        // Create a new task
        return CreatedAtAction(nameof(GetTaskById), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] Task updatedTask)
    {
        // Update existing task
        if (id != updatedTask.Id)
        {
            return BadRequest("Task ID mismatch");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        // Delete task by id
        return NoContent();
    }
}
