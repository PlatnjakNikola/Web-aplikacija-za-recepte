using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Repositories.Interface;
using System.Security.Cryptography;
using System.Text;

namespace Server.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext appDbContext;
        public UserRepository(AppDbContext appDbContext) 
        {
            this.appDbContext = appDbContext;
        }


        public async Task<User> CreateAsync(UserCreateUpdateDTO userToCreateDTO)
        {
            string passSource = userToCreateDTO.Password;
            byte[] tmpSource = ASCIIEncoding.ASCII.GetBytes(passSource);
            byte[] tmpHash = MD5.HashData(tmpSource);

            string hashPass = ByteArrayToString(tmpHash);

            User UserToCreate = new()
            {
                Id = 0,
                Username = userToCreateDTO.Username,
                Email = userToCreateDTO.Email,
                Password = hashPass,
                IsAdmin = userToCreateDTO.IsAdmin
            };

            appDbContext.Users.Add(UserToCreate);

            bool success = await appDbContext.SaveChangesAsync() > 0;

            if (success)
            {
                return UserToCreate;
            }
            else
            {
                return null;
            }
        }
        static string ByteArrayToString(byte[] arrInput)
        {
            int i;
            StringBuilder sOutput = new StringBuilder(arrInput.Length);
            for (i = 0; i < arrInput.Length; i++)
            {
                sOutput.Append(arrInput[i].ToString("X2"));
            }
            return sOutput.ToString();
        }

        public async Task<User> DeleteAsync(int Id)
        {
            User? userToDelete = await appDbContext.Users.FindAsync(Id);

            if (userToDelete != null)
            {
                appDbContext.Users.Remove(userToDelete);

                bool success = await appDbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return userToDelete;
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

        public async Task<List<User>> GetAllAsync()
        {
            List<User> allUsers = await appDbContext.Users.ToListAsync();

            return allUsers;
        }

        public async Task<User> GetByIdAsync(int Id)
        {
            User? user = await appDbContext.Users.FindAsync(Id);

            if (user != null)
            {
                return user;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> UpdateAsync(int Id, UserCreateUpdateDTO updatedUserDTO)
        {
            var userToUpdate = await appDbContext.Users.FindAsync(Id);

            string passSource = updatedUserDTO.Password;
            byte[] tmpSource = ASCIIEncoding.ASCII.GetBytes(passSource);
            byte[] tmpHash = MD5.HashData(tmpSource);

            string hashPass = ByteArrayToString(tmpHash);

            if (userToUpdate != null)
            {
                userToUpdate.Username = updatedUserDTO.Username;
                userToUpdate.Email = updatedUserDTO.Email;
                userToUpdate.Password = hashPass;
                userToUpdate.IsAdmin = updatedUserDTO.IsAdmin;


                bool success = await appDbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return userToUpdate;
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
