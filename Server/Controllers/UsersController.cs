using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Repositories.Interface;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository userRepository;

        public UsersController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
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
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
