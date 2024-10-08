/*
 * File: Order.cs
 * Author: Athuluwage T.N
 * Description: This file contains the Order class, which represents an order in the E-commerce system. It includes properties for the order's unique identifier, customer reference, order date, list of product IDs, total amount, status, delivery address, and timestamps for dispatch and delivery.
 * Created: 08/10/2024
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace EcommerceSystem.Models
{
    public class Order
    {
        [BsonId]
        public ObjectId _id { get; set; } // MongoDB will auto-generate this ID

        public string CustomerId { get; set; } // Reference to the customer
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public List<string> Items { get; set; } // List of product IDs
        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = "Processing"; // Order status

        public string DeliveryAddress { get; set; }

        public DateTime? DispatchedAt { get; set; } // Dispatch date, nullable if not dispatched
        public DateTime? DeliveredAt { get; set; } // Delivery date, nullable if not delivered
    }
}
