using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

public class PasswordValidationAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string password)
        {
            bool hasLength = password.Length > 6;
            bool hasUppercase = Regex.IsMatch(password, "[A-Z]");
            bool hasNumber = Regex.IsMatch(password, "\\d");

            if(!hasLength)
            {
                return new ValidationResult("The password must be atleast 8 characters long.");
            }

            if (!hasUppercase)
            {
                return new ValidationResult("The password must contain at least one uppercase letter.");
            }

            if (!hasNumber)
            {
                return new ValidationResult("The password must contain at least one number.");
            }

            return ValidationResult.Success;
        }

        return new ValidationResult("Invalid password format.");
    }
}
