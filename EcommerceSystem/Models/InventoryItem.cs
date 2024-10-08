/*
 * File: InventoryItem.cs
 * Author: Athuluwage T.N
 * Description: This file contains the InventoryItem class, which represents an item in the inventory for the E-commerce system. It includes properties for the inventory item's unique identifier, linked product ID, quantity in stock, low stock status, and a threshold for low stock notifications.
 * Created: 08/10/2024
 */


using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EcommerceSystem.Models
{
    public class InventoryItem
    {
        [BsonId]
        public ObjectId _id { get; set; }

        public string ProductId { get; set; } // Links to the product

        public int Quantity { get; set; }     // Number of items in stock

        public bool IsLowStock { get; set; }  // If true, send low stock notification

        public int LowStockThreshold { get; set; } = 5;  // Default threshold
    }
}
