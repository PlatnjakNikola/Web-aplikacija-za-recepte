using Server.Models;

namespace Server.Repositories.Interface
{
    public interface IFavoriteRepository
    {
        Task<Favorite> CreateAsync(FavoriteCreateDTO favoriteCreateDTO);
        Task<List<Favorite>> GetAllAsync();
        Task<List<Favorite>> GetAllFromCurrentUserAsync(int Id);
        Task<List<Favorite>> GetAllFromRecipeAsync(int Id);
        Task<Favorite> GetByIdAsync(int Id);
        Task<Favorite> DeleteAsync(int Id);
    }
}
