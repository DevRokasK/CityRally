public enum GuideStatus
{
    Invited,
    Accepted
}

public class Guide
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public GuideStatus Status { get; set; }
}
