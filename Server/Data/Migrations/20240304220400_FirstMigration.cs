using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Ingredients = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    TimeToPrepare = table.Column<int>(type: "INTEGER", nullable: true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    Enabled = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Description", "Enabled", "Image", "Ingredients", "TimeToPrepare", "Title", "Type" },
                values: new object[,]
                {
                    { 1, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 1", "Breakfast" },
                    { 2, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 2", "Breakfast" },
                    { 3, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 3", "Breakfast" },
                    { 4, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 4", "Breakfast" },
                    { 5, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 5", "Breakfast" },
                    { 6, "Description", false, "image1.png", "[\"Ing1\",\"ing2\"]", 20, "Recipe 6", "Breakfast" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recipes");
        }
    }
}
