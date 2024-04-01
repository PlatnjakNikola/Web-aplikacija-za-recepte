using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedFavoritesMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientsAmount",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "IngredientsName",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "IngredientsType",
                table: "Recipes",
                newName: "Ingredients");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6,
                column: "Ingredients",
                value: "[\"Ing1 20 g\",\"4 tbsp\"]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ingredients",
                table: "Recipes",
                newName: "IngredientsType");

            migrationBuilder.AddColumn<string>(
                name: "IngredientsAmount",
                table: "Recipes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IngredientsName",
                table: "Recipes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "IngredientsAmount", "IngredientsName", "IngredientsType" },
                values: new object[] { "[1,2]", "[\"Ing1\",\"ing2\"]", "[\"a\",\"b\"]" });
        }
    }
}
