using Server.Models;

namespace Server.Repositories.Interface
{
    public interface IFavoriteRepository
    {
        Task<Favorite> CreateAsync(int RecipeId, int UserId);
        Task<List<Favorite>> GetAllFromCurrentUserAsync();
        Task<Favorite> DeleteAsync(int Id);
    }
}
