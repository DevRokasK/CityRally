using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class ChangePasswordModel
{
    public string Email { get; set; }

    public string OldPassword { get; set; }

    [PasswordValidation]
    public string NewPassword { get; set; }
}
