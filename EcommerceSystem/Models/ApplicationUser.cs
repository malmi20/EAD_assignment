/*
 * File: ApplicationUser.cs
 * Author: Athuluwage T.N
 * Description: This file contains the ApplicationUser class, which represents a user in the E-commerce system. It includes properties for user identification, email, password hash, and roles (e.g., Admin, Vendor, CSR) assigned to the user.
 * Created: 08/10/2024
 */


using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace EcommerceSystem.Models
{
    public class ApplicationUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }

        // Role(s) of the user: Admin, Vendor, CSR
        public List<string> Roles { get; set; } = new List<string>();
    }
}
