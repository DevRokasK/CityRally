using System.ComponentModel.DataAnnotations;

public class ValidEmailAttribute : ValidationAttribute
{
    public ValidEmailAttribute() : base("Invalid email format.")
    {
    }

    public override bool IsValid(object value)
    {
        var email = value as string;
        if (string.IsNullOrEmpty(email))
        {
            return false;
        }

        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}
