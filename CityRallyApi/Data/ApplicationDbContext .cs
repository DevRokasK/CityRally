using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Event> Events { get; set; }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Guide> Guides { get; set; }

    public DbSet<Task> Tasks { get; set; }
    public DbSet<Subtask> Subtasks { get; set; }

}
