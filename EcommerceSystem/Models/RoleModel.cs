/*
 * File: RoleModel.cs
 * Author: Athuluwage T.N
 * Description: This file contains the RoleModel class, which represents a role in the E-commerce system. It includes properties for the role's unique identifier and the name of the role.
 * Created: 08/10/2024
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceSystem.Models
{
    public class RoleModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string RoleName { get; set; }
    }
}
