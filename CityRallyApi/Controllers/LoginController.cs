using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LoginController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Login(Login model)
    {
        if (string.IsNullOrEmpty(model.Email))
        {
            return BadRequest("Email is required.");
        }

        if (model.UserType == "Admin")
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Email == model.Email);
            if (admin != null)
            {
                if (admin.Password == model.Password)
                {
                    return Ok(new { Message = "Admin login successful", UserType = "Admin" });
                }
                else
                {
                    return Unauthorized("Invalid password.");
                }
            }
        }

        if (model.UserType == "Guide")
        {
            var guide = _context.Guides
            .Where(g => g.Email == model.Email)
            .OrderByDescending(g => g.Id)
            .FirstOrDefault();

            if (guide != null)
            {
                if (guide.Status == GuideStatus.Accepted)
                {
                    return Ok(new { Message = "Guide login successful", UserType = "Guide", TeamId = guide.TeamId });
                }
                else if (guide.Status == GuideStatus.Invited)
                {
                    guide.Status = GuideStatus.Accepted;
                    _context.SaveChanges();

                    return Ok(new { Message = "Guide login successful, status updated", UserType = "Guide", TeamId = guide.TeamId });
                }
                else
                {
                    return Unauthorized("Guide is not yet accepted.");
                }
            }
        }

        return Unauthorized("Invalid email or password.");
    }
}
