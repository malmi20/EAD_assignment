/*
 * File: RolesController.cs
 * Author: Athuluwage T.N
 * Description: This file contains the RolesController, which handles role management operations such as creating new roles and retrieving existing roles within the system.
 * Created: 08/10/2024
 */


using EcommerceSystem.Models;
using EcommerceSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EcommerceSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RolesController(RoleService roleService)
        {
            _roleService = roleService;
        }

        //create role controller 
        [HttpPost("create-role")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var result = await _roleService.CreateRoleAsync(roleName);
            return Ok(result);
        }


        //get roles controller
        [HttpGet("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }
    }
}
