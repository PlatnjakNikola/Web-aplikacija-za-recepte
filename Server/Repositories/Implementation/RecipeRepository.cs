using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repositories.Interface;

namespace Server.Repositories.Implementation
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext appDbContext;

        public RecipeRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<List<Recipe>> GetAllAsync()
        {
            List<Recipe> allRecipes = await appDbContext.Recipes.ToListAsync();

            return allRecipes;
        }

        public async Task<Recipe> GetByIdAsync(int Id)
        {
            Recipe? recipe = await appDbContext.Recipes.FindAsync(Id);

            return recipe;
        }

        public async Task<Recipe> CreateAsync(RecipeCreateUpdateDTO recipeToCreateDTO)
        {
            var recipe = new Recipe
            {
                Id = 0,
                Title = recipeToCreateDTO.Title,
                Ingredients = recipeToCreateDTO.Ingredients,
                Description = recipeToCreateDTO.Description,
                TimeToPrepare = recipeToCreateDTO.TimeToPrepare,
                Type = recipeToCreateDTO.Type,
                Image = recipeToCreateDTO.Image,
                Enabled = recipeToCreateDTO.Enabled
            };

            await appDbContext.Recipes.AddAsync(recipe);
            await appDbContext.SaveChangesAsync();

            return recipe;
        }

        public async Task<Recipe> UpdateAsync(int Id, RecipeCreateUpdateDTO updatedRecipeDTO)
        {
            Recipe? recipeToUpdate = await appDbContext.Recipes.FindAsync(Id);

            if (recipeToUpdate != null)
            {
                recipeToUpdate.Title = updatedRecipeDTO.Title;
                recipeToUpdate.Ingredients = updatedRecipeDTO.Ingredients;
                recipeToUpdate.Description = updatedRecipeDTO.Description;
                recipeToUpdate.TimeToPrepare = updatedRecipeDTO.TimeToPrepare;
                recipeToUpdate.Type = updatedRecipeDTO.Type;
                recipeToUpdate.Image = updatedRecipeDTO.Image;
                recipeToUpdate.Enabled = updatedRecipeDTO.Enabled;

                bool success = await appDbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return recipeToUpdate;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<Recipe> DeleteAsync(int Id)
        {
            Recipe? recipeToDelete = await appDbContext.Recipes.FindAsync(Id);

            if (recipeToDelete != null)
            {
                appDbContext.Recipes.Remove(recipeToDelete);

                bool success = await appDbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return recipeToDelete;
                }
                else
                {
                    return null;
                }

                
            }
            else
            {
                return null;
            }
        }
    }
}
