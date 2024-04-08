using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        private readonly IRecipeRepository recipeRepository;
        private readonly IFavoriteRepository favoriteRepository;

        public FavoritesController(IFavoriteRepository favoriteRepository, IRecipeRepository recipeRepository)
        {
            this.recipeRepository = recipeRepository;
            this.favoriteRepository = favoriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFavorites()
        {
            List<Favorite> allFavorites = await favoriteRepository.GetAllAsync();

            return Ok(allFavorites);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite(FavoriteCreateDTO favoriteCreateDTO)
        {
            Favorite newFavorite = await favoriteRepository.CreateAsync(favoriteCreateDTO);

            recipeRepository.AddFavorite(favoriteCreateDTO.RecipeId);
            
            return Ok(newFavorite);
        }

        [HttpGet]
        [Route("{UserId}")]
        public async Task<IActionResult> GetAllFavoritesFromCurrentUser(int UserId)
        {
            List<Favorite> favorites = await favoriteRepository.GetAllFromCurrentUserAsync(UserId);

            return Ok(favorites);
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteFavorite(int Id)
        {
            Favorite? favorite = await favoriteRepository.GetByIdAsync(Id);
            Favorite? favoriteToDelete = await favoriteRepository.DeleteAsync(Id);

            if (favorite != null)
            {
                recipeRepository.RemoveFavorite(favorite.RecipeId);
            }

            if (favoriteToDelete != null)
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
