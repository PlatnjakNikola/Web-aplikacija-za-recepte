using Microsoft.EntityFrameworkCore;
using Server.Controllers;
using Server.Data;
using Server.Models;
using Server.Repositories.Interface;

namespace Server.Repositories.Implementation
{
    public class FavoriteRepository : IFavoriteRepository
    { 
        private readonly AppDbContext appDbContext;

        public FavoriteRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<Favorite> CreateAsync(int RecipeId, int UserId)
        {
            var favorite = new Favorite()
            {
                Id = 0,
                RecipeId = RecipeId,
                UserId = UserId
            };

            await appDbContext.Favorites.AddAsync(favorite);
            await appDbContext.SaveChangesAsync();

            return favorite;
        }

        public async Task<List<Favorite>> GetAllFromCurrentUserAsync()
        {
            List<Favorite> allFavorites = await appDbContext.Favorites.ToListAsync();
            List<Favorite> usersFavorites = new List<Favorite>();

            for (int i = 0; i < allFavorites.Count; i++)
            {
                if (allFavorites[i].UserId == UsersController.currentUser.Id)
                {
                    usersFavorites.Add(allFavorites[i]);
                }
            }

            return usersFavorites;
        }

        public async Task<Favorite> DeleteAsync(int Id)
        {
            Favorite? favoriteToDelete = await appDbContext.Favorites.FindAsync(Id);
            
            if (favoriteToDelete != null)
            {
                appDbContext.Favorites.Remove(favoriteToDelete);

                bool success = await appDbContext.SaveChangesAsync() > 0;
                if (success)
                {
                    return favoriteToDelete;
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
