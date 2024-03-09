using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Text;
using System.Security.Cryptography;
using Server.Models;

namespace Server;

public static class UserEndpoints
{
    public static void MapUsersEndpoints(this WebApplication app)
    {
        app.MapGet("/users", async (AppDbContext dbContext) =>
        {
            List<User> allUsers = await dbContext.Users.ToListAsync();

            return Results.Ok(allUsers);
        });

        app.MapGet("/users/{Id}", async (int Id, AppDbContext dbContext) =>
        {
            User? user = await dbContext.Users.FindAsync(Id);

            if (user != null)
            {
                return Results.Ok(user);
            }
            else
            {
                return Results.NotFound();
            }
        });

        app.MapPost("/users", async (UserCreateUpdateDTO userToCreateDTO, AppDbContext dbContext) =>
        {
            // Let EF Core auto-increment the ID.

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

            dbContext.Users.Add(UserToCreate);

            bool success = await dbContext.SaveChangesAsync() > 0;

            if (success)
            {
                return Results.Created($"/users/{UserToCreate.Id}", userToCreateDTO);
            }
            else
            {
                // 500 = internal server error.
                return Results.StatusCode(500);
            }
        });

        app.MapPut("/users/{Id}", async (int Id, UserCreateUpdateDTO updatedUserDTO, AppDbContext dbContext) =>
        {
            var userToUpdate = await dbContext.Users.FindAsync(Id);

            if (userToUpdate != null)
            {
                userToUpdate.Username = updatedUserDTO.Username;
                userToUpdate.Email = updatedUserDTO.Email;
                userToUpdate.Password = updatedUserDTO.Password;
                userToUpdate.IsAdmin = updatedUserDTO.IsAdmin;


                bool success = await dbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return Results.Ok(userToUpdate);
                }
                else
                {
                    // 500 = internal server error.
                    return Results.StatusCode(500);
                }
            }
            else
            {
                return Results.NotFound();
            }
        });

        app.MapDelete("/users/{Id}", async (int Id, AppDbContext dbContext) =>
        {
            User? userToDelete = await dbContext.Users.FindAsync(Id);

            if (userToDelete != null)
            {
                dbContext.Users.Remove(userToDelete);

                bool success = await dbContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return Results.NoContent();
                }
                else
                {
                    // 500 = internal server error.
                    return Results.StatusCode(500);
                }
            }
            else
            {
                return Results.NotFound();
            }
        });
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

}
