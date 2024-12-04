using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class AddAdmin
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("email")]
    [ValidEmail]
    public string Email { get; set; }

    [Column("password")]
    [PasswordValidation]
    public string Password { get; set; }

    public string addKey { get; set; }
}
