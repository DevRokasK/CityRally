using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

public class TeamSubtask
{
    [Column("team_id")]
    public int TeamId { get; set; }

    [Column("subtask_id")]
    public int SubtaskId { get; set; }
}
