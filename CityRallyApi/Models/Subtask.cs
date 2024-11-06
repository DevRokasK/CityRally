using System;

public class Subtask
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public int Points { get; set; }
    public bool IsTimed { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
