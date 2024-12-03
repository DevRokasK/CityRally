using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Admin
{
	[Column("id")]
	public int Id { get; set; }

	[Column("name")]
	public string Name { get; set; }

	[Column("email")]
	public string Email { get; set; }

	[Column("password")]
	public string Password { get; set; }
}
