using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


public class Task
{
    [Column("id")]
    public int Id { get; set; }

    [Column("isMain")]
    public bool IsMain { get; set; }

    [Column("isEnabled")]
    public bool IsEnabled { get; set; }

    [Column("fk_id_Event")]
    public int EventId { get; set; }

    public ICollection<Subtask>? Subtasks { get; set; }
}
