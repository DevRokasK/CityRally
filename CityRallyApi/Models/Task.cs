using System.Collections.Generic;

public class Task
{
    public int Id { get; set; }
    public bool IsMain { get; set; }
    public bool IsEnabled { get; set; }
    public ICollection<Subtask>? Subtasks { get; set; }
}
