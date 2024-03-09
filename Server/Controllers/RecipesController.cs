using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Server.Models;
using Server.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : Controller
    {
        private readonly IRecipeRepository recipeRepository;

        public RecipesController(IRecipeRepository recipeRepository)
        {
            this.recipeRepository = recipeRepository;
        }

        [HttpGet]
        
        public async Task<IActionResult> GetAllRecipes()
        {
            List<Recipe> allRecipes = await recipeRepository.GetAllAsync();

            return Ok(allRecipes);
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> GetRecipeById(int Id)
        {
            Recipe? recipe = await recipeRepository.GetByIdAsync(Id);

            if (recipe != null)
            {
                return Ok(recipe);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipe(RecipeCreateUpdateDTO recipeToCreateDTO)
        {
            
            Recipe createdRecipe = await recipeRepository.CreateAsync(recipeToCreateDTO);

            var response = new Recipe
            {
                Id = createdRecipe.Id,
                Title = createdRecipe.Title,
                Ingredients = createdRecipe.Ingredients,
                Description = createdRecipe.Description,
                TimeToPrepare = createdRecipe.TimeToPrepare,
                Type = createdRecipe.Type,
                Image = createdRecipe.Image,
                Enabled = createdRecipe.Enabled
            };

            return Ok(response);

        }

        [HttpPut]
        [Route("{Id}")]
        public async Task<IActionResult> UpdateRecipe(int Id, RecipeCreateUpdateDTO updatedRecipeDTO)
        {

            Recipe? updatedRecipe = await recipeRepository.UpdateRecipeAsync(Id, updatedRecipeDTO);

            if (updatedRecipe != null) 
            {
                return Ok(updatedRecipe);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteRecipe(int Id)
        {
            Recipe? recipeToDelete = await recipeRepository.DeleteRecipeAsync(Id);

            if (recipeToDelete != null)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }


    }
}
