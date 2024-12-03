using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Admin> Admins { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Team> Teams { get; set; }
    public DbSet<Guide> Guides { get; set; }

    public DbSet<Task> Tasks { get; set; }
    public DbSet<Subtask> Subtasks { get; set; }

    public DbSet<TeamSubtask> Team_Subtasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TeamSubtask>()
            .HasKey(ts => new { ts.TeamId, ts.SubtaskId });
    }
}
