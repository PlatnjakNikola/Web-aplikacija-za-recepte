using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories.Implementation;
using Server.Repositories.Interface;
using System.Security.Cryptography;
using System.Text;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly IFavoriteRepository favoriteRepository;

        public UsersController(IUserRepository userRepository, IFavoriteRepository favoriteRepository)
        {
            this.userRepository = userRepository;
            this.favoriteRepository = favoriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            List<User> allUsers = await userRepository.GetAllAsync();

            return Ok(allUsers);
        }

        [HttpGet]
        [Route("{Id}")]
        public async Task<IActionResult> GetUserById(int Id)
        {
            User? user = await userRepository.GetByIdAsync(Id);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserCreateUpdateDTO userToCreateDTO)
        {

            User createdUser = await userRepository.CreateAsync(userToCreateDTO);

            return Ok(createdUser);

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginUser(UserLogin user)
        {
            List<User> allUsers = await userRepository.GetAllAsync();

            string passSource = user.Password;
            byte[] tmpSource = ASCIIEncoding.ASCII.GetBytes(passSource);
            byte[] tmpHash = MD5.HashData(tmpSource);

            string hashPass = UserRepository.ByteArrayToString(tmpHash);

            User loggedInUser = null;

            foreach (User u in allUsers)
            {
                if (user.UsernameOrEmail == u.Email || user.UsernameOrEmail == u.Username)
                {
                    if (u.Password == hashPass)
                    {
                        loggedInUser = u;
                    }
                }
            }

            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpPut]
        [Route("{Id}")]
        public async Task<IActionResult> UpdateUser(int Id, UserCreateUpdateDTO updatedUserDTO)
        {

            User? updatedUser = await userRepository.UpdateAsync(Id, updatedUserDTO);

            if (updatedUser != null)
            {
                return Ok(updatedUser);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{Id}")]
        public async Task<IActionResult> DeleteUser(int Id)
        {
            User? userToDelete = await userRepository.DeleteAsync(Id);

            if (userToDelete != null)
            {
                //Delete favorites
                List<Favorite> favorites = await favoriteRepository.GetAllFromCurrentUserAsync(Id);
                foreach (Favorite f in favorites)
                {
                    if (f.UserId == Id)
                    {
                        await favoriteRepository.DeleteAsync(f.Id);
                    }
                }

                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
