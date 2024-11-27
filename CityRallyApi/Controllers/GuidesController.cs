//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;

//[Route("api/[controller]")]
//[ApiController]
//public class GuidesController : ControllerBase
//{
//    [HttpGet]
//    public ActionResult<IEnumerable<Guide>> GetAllGuides()
//    {
//        return Ok(new List<Guide>());
//    }

//    [HttpPost]
//    public ActionResult<Guide> CreateGuide([FromBody] Guide newGuide)
//    {
//        return CreatedAtAction(nameof(GetAllGuides), new { id = newGuide.Id }, newGuide);
//    }

//    [HttpPut("{id}")]
//    public IActionResult UpdateGuide(int id, [FromBody] Guide updateGuide)
//    {
//        return NoContent();
//    }

//    [HttpDelete("{id}")]
//    public IActionResult DeleteGuide(int id)
//    {
//        return NoContent();
//    }
//}
