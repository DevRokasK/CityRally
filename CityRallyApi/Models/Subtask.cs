using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class Subtask
{
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("points")]
    public int Points { get; set; }

    [Column("isTimed")]
    public bool IsTimed { get; set; }

    [Column("startDate")]
    public DateTime? StartDate { get; set; }

    [Column("endDate")]
    public DateTime? EndDate { get; set; }

    [Column("fk_id_Task")]
    public int TaskId { get; set; }
}
