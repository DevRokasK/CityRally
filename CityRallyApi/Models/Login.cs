using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Login
{
    [ValidEmail]
    public string Email { get; set; }

    public string? Password { get; set; }

    public string UserType { get; set; }
}
