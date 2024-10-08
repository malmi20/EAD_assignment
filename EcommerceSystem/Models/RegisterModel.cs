/*
 * File: RegisterModel.cs
 * Author: Athuluwage T.N
 * Description: This file contains the RegisterModel class, which represents the data required for user registration in the E-commerce system. It includes properties for the user's email, password, confirmation password, and roles to be assigned during registration.
 * Created: 08/10/2024
 */

namespace EcommerceSystem.Models
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        // Roles to assign during registration
        public List<string> Roles { get; set; } = new List<string>();
    }
}
