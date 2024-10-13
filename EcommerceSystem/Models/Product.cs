/*
 * File: Product.cs
 * Author: Athuluwage T.N
 * Description: This file contains the Product class, which represents a product in the E-commerce system. It includes properties for the product's unique identifier, name, description, price, linked category ID, and a flag indicating whether the product is active.
 * Created: 08/10/2024
 */


using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceSystem.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } // MongoDB automatically generates this ID

        public string Name { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public string Category { get; set; }
        public string Image { get; set; }

        public double RatingValue { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryID { get; set; } = ""; // Ensure this ID is correctly linked to the Category

        public bool IsActive { get; set; } // Determines if the product is active
    }
}
