using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // Define your DbSets here
    public DbSet<Event> Events { get; set; }
    public DbSet<Team> Teams { get; set; }
    // Add other DbSets as needed
}
