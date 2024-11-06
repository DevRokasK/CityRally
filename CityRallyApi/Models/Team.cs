using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Team
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("fk_id_Event")]
    public int EventId { get; set; }

    public ICollection<Guide>? Guides { get; set; }
}
