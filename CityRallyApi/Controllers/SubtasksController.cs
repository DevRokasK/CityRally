//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;

//[Route("api/[controller]")]
//[ApiController]
//public class SubtasksController : ControllerBase
//{
//    [HttpGet("{id}")]
//    public ActionResult<Subtask> GetSubtaskById(int id)
//    {
//        return Ok(new Subtask());
//    }

//    [HttpPost]
//    public ActionResult<Subtask> CreateSubtask([FromBody] Subtask newSubtask)
//    {
//        return CreatedAtAction(nameof(GetSubtaskById), new { id = newSubtask.Id }, newSubtask);
//    }

//    [HttpPut("{id}")]
//    public IActionResult UpdateSubtask(int id, [FromBody] Subtask updatedSubtask)
//    {
//        if (id != updatedSubtask.Id)
//        {
//            return BadRequest("Subtask ID mismatch");
//        }
//        return NoContent();
//    }

//    [HttpDelete("{id}")]
//    public IActionResult DeleteSubtask(int id)
//    {
//        return NoContent();
//    }
//}
