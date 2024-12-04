using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public enum GuideStatus
{
    Invited = 0,
    Accepted = 1
}

public class Guide
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("email")]
    [ValidEmail]
    public string? Email { get; set; }

    [Column("status")]
    public GuideStatus Status { get; set; }

    [Column("fk_id_Team")]
    public int TeamId { get; set; }
}
