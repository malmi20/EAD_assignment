/*
 * File: Category.cs
 * Author: Athuluwage T.N
 * Description: This file contains the Category class, which represents a product category in the E-commerce system. It includes properties for the category's unique identifier, name, and a flag indicating whether the category is active.
 * Created: 08/10/2024
 */


using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceSystem.Models
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryID { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; } // Determines if the category is active
    }
}
