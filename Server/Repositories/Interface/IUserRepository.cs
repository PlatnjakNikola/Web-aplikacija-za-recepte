using Server.Models;

namespace Server.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(UserCreateUpdateDTO userToCreateDTO);
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(int Id);
        Task<User> UpdateAsync(int Id, UserCreateUpdateDTO updatedUserDTO);
        Task<User> DeleteAsync(int Id);
    }
}
