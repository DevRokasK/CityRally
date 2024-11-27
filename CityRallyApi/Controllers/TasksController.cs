using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public ActionResult<Task> GetTaskById(int id)
    {
        var taskEntity = _context.Tasks
            .Include(e => e.Subtasks)
            .FirstOrDefault(e => e.Id == id);

        if(taskEntity == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        return Ok(taskEntity);
    }

    [HttpPost]
    public ActionResult<Task> CreateTask([FromBody] Task newTask)
    {
        _context.Tasks.Add(newTask);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTaskById), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, [FromBody] Task updatedTask)
    {
        var existingTask = _context.Tasks
        .Include(t => t.Subtasks)
        .FirstOrDefault(t => t.Id == id);

        if (existingTask == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        if (updatedTask.Subtasks != null)
        {
            var updatedSubtaskIds = updatedTask.Subtasks.Select(g => g.Id).ToHashSet();

            var subtasksToDelete = existingTask.Subtasks
                .Where(g => !updatedSubtaskIds.Contains(g.Id))
                .ToList();

            _context.Subtasks.RemoveRange(subtasksToDelete);

            foreach (var existingSubtask in existingTask.Subtasks)
            {
                var updatedSubtask = updatedTask.Subtasks.FirstOrDefault(g => g.Id == existingSubtask.Id);
                if (updatedSubtask != null)
                {
                    existingSubtask.Title = updatedSubtask.Title;
                    existingSubtask.Points = updatedSubtask.Points;
                }
            }

            var newSubtasks = updatedTask.Subtasks
                .Where(g => g.Id == 0)
                .Select(g => new Subtask
                {
                    Title = g.Title,
                    Points = g.Points,
                    IsTimed = g.IsTimed,
                    StartDate = g.StartDate,
                    EndDate = g.EndDate,
                    TaskId = id
                });

            _context.Subtasks.AddRange(newSubtasks);
        }

        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var taskEntity = _context.Tasks
          .Include(e => e.Subtasks)
          .FirstOrDefault(e => e.Id == id);

        if (taskEntity == null)
        {
            return NotFound($"Task with ID {id} not found");
        }

        if (taskEntity.Subtasks != null)
        {
            foreach (var subtask in taskEntity.Subtasks)
            {
                _context.Subtasks.Remove(subtask);
            }
        }

        _context.Tasks.Remove(taskEntity);
        _context.SaveChanges();

        return NoContent();
    }
}
