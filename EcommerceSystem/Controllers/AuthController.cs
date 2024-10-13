/*
 * File: AuthController.cs
 * Author: Athuluwage T.N
 * Description: This file contains the AuthController, which handles user authentication, including registration and login functionality. The controller manages user registration with password hashing, role assignment, and generates JWT tokens for login sessions.
 * Created: 08/10/2024
 */

using EcommerceSystem.Models;
using EcommerceSystem.Services;
using EcommerceSystem.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace EcommerceSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly MongoDbContext _dbContext;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;
        private readonly TokenService _tokenService;

        public AuthController(MongoDbContext dbContext, TokenService tokenService)
        {
            _dbContext = dbContext;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
            _tokenService = tokenService;
        }


        //register controller
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword)
                return BadRequest("Passwords do not match");

            var existingUser = await _dbContext.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (existingUser != null)
                return BadRequest("User already exists");

            var user = new ApplicationUser
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.UserName,
                Address = model.Address,
                ContactNo = model.ContactNo,
                Email = model.Email,
                Roles = model.Roles // Assign roles during registration
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, model.Password);
            await _dbContext.Users.InsertOneAsync(user);

            return Ok("User registered successfully");
        }


        //login controller

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _dbContext.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (user == null)
                return Unauthorized();

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized();

            // Generate the JWT token
            var token = _tokenService.GenerateToken(user);

            // Return the token and the user's role
            return Ok(new
            {
                ID = user.Id,
                FullName = user.FirstName + " " + user.LastName,
                Token = token,
                Role = user.Roles
            });
        }
    }
}
