using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories.Implementation;
using Server.Repositories.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : Controller
    {
        private readonly IFavoriteRepository favoriteRepository;

        public FavoritesController(IFavoriteRepository favoriteRepository)
        {
            this.favoriteRepository = favoriteRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite()
        {
            Favorite newFavorite = await favoriteRepository.CreateAsync(RecipesController.currentRecipe.Id, UsersController.currentUser.Id);
            
            return Ok(newFavorite);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFavoritesFromCurrentUser()
        {
            List<Favorite> favorites = await favoriteRepository.GetAllFromCurrentUserAsync();

            return Ok(favorites);
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteFavorite(int Id)
        {
            Favorite? favoriteToDelete = await favoriteRepository.DeleteAsync(Id);

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
