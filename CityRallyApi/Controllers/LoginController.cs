using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Options;

//Login API 2.0 (Login, Change Password, Add Admin with email sent to new Admin)
[Route("api/v:{version:apiVersion}/LoginV2.0")]
[ApiController]
[ApiVersion("2.0")]
public class LoginV2Controller : ControllerBase
{
    private readonly string smtpUsername;
    private readonly string smtpPassword;
    private readonly string sender;
    private readonly ApplicationDbContext _context;

    public LoginV2Controller(ApplicationDbContext context, IOptions<SmtpSettings> smtpSettings)
    {
        _context = context;
        smtpUsername = smtpSettings.Value.Username;
        smtpPassword = smtpSettings.Value.Password;
        sender = smtpSettings.Value.Sender;
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
                if (PasswordHelper.VerifyPassword(model.Password, admin.Password))
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

    [HttpPut("ChangePassword")]
    public IActionResult ChangePassword(ChangePasswordModel model)
    {
        if (string.IsNullOrEmpty(model.Email))
        {
            return BadRequest("Email is required.");
        }

        if (string.IsNullOrEmpty(model.OldPassword) || string.IsNullOrEmpty(model.NewPassword))
        {
            return BadRequest("Old password and new password are required.");
        }

        var admin = _context.Admins.FirstOrDefault(a => a.Email == model.Email);
        if (admin == null)
        {
            return NotFound("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(model.OldPassword, admin.Password))
        {
            return Unauthorized("Old password is incorrect.");
        }

        var newHashedPassword = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

        admin.Password = newHashedPassword;
        _context.SaveChanges();

        return Ok(new { Message = "Password successfully changed." });
    }

    [HttpPost("AddAdmin")]
    public IActionResult AddAdmin(AddAdmin model)
    {
        if (model.addKey != "CityRally")
        {
            return Unauthorized("Unauthorized to add a new Admin.");
        }

        if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest("Name, email, and password are required.");
        }

        if (_context.Admins.Any(a => a.Email == model.Email))
        {
            return Conflict("An admin with this email already exists.");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

        var newAdmin = new Admin
        {
            Name = model.Name,
            Email = model.Email,
            Password = hashedPassword
        };

        _context.Admins.Add(newAdmin);
        _context.SaveChanges();

        try
        {
            SendAdminAddedEmail(model.Email, model.Name);
        }
        catch (Exception ex)
        {
            return Ok($"Admin added, but failed to send email. Error: {ex.Message}");
        }

        return Ok(new { Message = "Admin added successfully.", AdminId = newAdmin.Id });
    }

    private void SendAdminAddedEmail(string email, string name)
    {
        try
        {
            var smtpClient = new SmtpClient("smtp.sendgrid.net")
            {
                Port = 587,
                Credentials = new System.Net.NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(sender),
                Subject = "City Rally Admin",
                Body = $"<p>Dear {name},</p>" +
                $"<p>Your admin account has been successfully created. You can now log in to the City Rally system as an Admin.</p>" +
                $"<p>Please change password before logging in.</p>",
                IsBodyHtml = true
            };

            mailMessage.To.Add(email);

            smtpClient.Send(mailMessage);
            Console.WriteLine("Email sent successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
        }
    }
}

//Login API 1.0 (Login, Change Password, Add Admin)
[Route("api/v:{version:apiVersion}/LoginV1.0")]
[ApiController]
[ApiVersion("1.0")]
public class LoginV1Controller : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LoginV1Controller(ApplicationDbContext context)
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
                if (PasswordHelper.VerifyPassword(model.Password, admin.Password))
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

    [HttpPut("ChangePassword")]
    public IActionResult ChangePassword(ChangePasswordModel model)
    {
        if (string.IsNullOrEmpty(model.Email))
        {
            return BadRequest("Email is required.");
        }

        if (string.IsNullOrEmpty(model.OldPassword) || string.IsNullOrEmpty(model.NewPassword))
        {
            return BadRequest("Old password and new password are required.");
        }

        var admin = _context.Admins.FirstOrDefault(a => a.Email == model.Email);
        if (admin == null)
        {
            return NotFound("User not found.");
        }

        if (!BCrypt.Net.BCrypt.Verify(model.OldPassword, admin.Password))
        {
            return Unauthorized("Old password is incorrect.");
        }

        var newHashedPassword = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

        admin.Password = newHashedPassword;
        _context.SaveChanges();

        return Ok(new { Message = "Password successfully changed." });
    }

    [HttpPost("AddAdmin")]
    public IActionResult AddAdmin(AddAdmin model)
    {
        if (model.addKey != "CityRally")
        {
            return Unauthorized("Unauthorized to add a new Admin.");
        }

        if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest("Name, email, and password are required.");
        }

        if (_context.Admins.Any(a => a.Email == model.Email))
        {
            return Conflict("An admin with this email already exists.");
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

        var newAdmin = new Admin
        {
            Name = model.Name,
            Email = model.Email,
            Password = hashedPassword
        };

        _context.Admins.Add(newAdmin);
        _context.SaveChanges();

        return Ok(new { Message = "Admin added successfully.", AdminId = newAdmin.Id });
    }
}