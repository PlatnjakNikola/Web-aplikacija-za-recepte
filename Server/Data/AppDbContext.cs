using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class AppDbContext : DbContext
{
    // We use => (expression-bodied members) to avoid nullable reference types errors.
    // Source: https://docs.microsoft.com/en-us/ef/core/miscellaneous/nullable-reference-types#dbcontext-and-dbset.
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<User> Users => Set<User>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Call the base version of this method (in DbContext) as well, else we sometimes get an error later on.
        base.OnModelCreating(modelBuilder);

        var recipesToSeed = new Recipe[6];

        for (int i = 1; i < 7; i++)
        {
            recipesToSeed[i - 1] = new()
            {
                Id = i,
                Title = $"Recipe {i}",
                Ingredients = new List<string> { $"Ing1", $"ing2"},
                Description = $"Description",
                TimeToPrepare = 20,
                Type = "Breakfast",
                Image = "image1.png",
                Enabled = false
            };
        }

        modelBuilder.Entity<Recipe>().HasData(recipesToSeed);

        var usersToSeed = new User[6];

        for (int i = 1; i < 7; i++)
        {
            usersToSeed[i - 1] = new()
            {
                Id = i,
                Username = $"recipemaster{i}",
                Email = "example@mail.com",
                Password = $"hash",
                IsAdmin = false
            };
        }

        modelBuilder.Entity<User>().HasData(usersToSeed);
    }
}