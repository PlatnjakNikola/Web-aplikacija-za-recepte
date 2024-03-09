using Server.Models;

namespace Server.Repositories.Interface
{
    public interface IRecipeRepository
    {
        Task<Recipe> CreateAsync(RecipeCreateUpdateDTO recipeToCreateDTO);
        Task<List<Recipe>> GetAllAsync();
        Task<Recipe> GetByIdAsync(int Id);
        Task<Recipe> UpdateRecipeAsync(int Id, RecipeCreateUpdateDTO updatedRecipeDTO);
        Task<Recipe> DeleteRecipeAsync(int Id);
    }
}
