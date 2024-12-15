using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.Server.Models;

namespace PlantCareScheduler.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Plant> Plants { get; set; }
}
