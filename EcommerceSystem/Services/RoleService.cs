/*
 * File: RoleService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the RoleService class, which manages user roles within the E-commerce system. It provides methods to create new roles, retrieve all existing roles, and check if a specific role exists.
 * Created: 08/10/2024
 */

using EcommerceSystem.Models;
using EcommerceSystem.Data;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EcommerceSystem.Services
{
    public class RoleService
    {
        private readonly MongoDbContext _dbContext;

        public RoleService(MongoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Method to create a new role
        public async Task<string> CreateRoleAsync(string roleName)
        {
            var existingRole = await _dbContext.Roles.Find(r => r.RoleName == roleName).FirstOrDefaultAsync();
            if (existingRole != null)
                return "Role already exists";

            var role = new RoleModel
            {
                RoleName = roleName
            };

            await _dbContext.Roles.InsertOneAsync(role);
            return "Role created successfully";
        }

        // Method to get all roles
        public async Task<List<RoleModel>> GetRolesAsync()
        {
            return await _dbContext.Roles.Find(r => true).ToListAsync();
        }

        // Method to check if a role exists
        public async Task<bool> RoleExistsAsync(string roleName)
        {
            var existingRole = await _dbContext.Roles.Find(r => r.RoleName == roleName).FirstOrDefaultAsync();
            return existingRole != null;
        }
    }
}
