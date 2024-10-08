/*
 * File: OrderService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the OrderService class, which handles operations related to order management in the E-commerce system. It includes methods to create, retrieve, update, cancel, and dispatch orders. The service ensures that updates or cancellations can only occur when an order is in the "Processing" state, while dispatched orders get their status and dispatch date updated accordingly.
 * Created: 08/10/2024
 */


using EcommerceSystem.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using EcommerceSystem.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommerceSystem.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(MongoDbContext dbContext)
        {
            _orders = dbContext.Orders;
        }

        // Get all orders
        public async Task<List<Order>> GetAllOrdersAsync() =>
            await _orders.Find(order => true).ToListAsync();


        // Create new order
        public async Task CreateOrderAsync(Order order) =>
            await _orders.InsertOneAsync(order);

        // Get order by ID
        public async Task<Order> GetOrderByIdAsync(string id) =>
            await _orders.Find(order => order._id == new ObjectId(id)).FirstOrDefaultAsync();

        // Update order (only if not dispatched)
        public async Task UpdateOrderAsync(string id, Order updatedOrder)
        {
            var order = await GetOrderByIdAsync(id);
            if (order != null && order.Status == "Processing")
            {
                await _orders.ReplaceOneAsync(o => o._id == new ObjectId(id), updatedOrder);
            }
        }

        // Cancel order (only if not dispatched)
        public async Task CancelOrderAsync(string id)
        {
            var order = await GetOrderByIdAsync(id);
            if (order != null && order.Status == "Processing")
            {
                await _orders.DeleteOneAsync(o => o._id == new ObjectId(id));
            }
        }

        // Mark order as dispatched
        public async Task DispatchOrderAsync(string id)
        {
            var order = await GetOrderByIdAsync(id);
            if (order != null && order.Status == "Processing")
            {
                await _orders.UpdateOneAsync(
                    o => o._id == new ObjectId(id),
                    Builders<Order>.Update
                        .Set(o => o.Status, "Dispatched")
                        .Set(o => o.DispatchedAt, DateTime.UtcNow)
                );
            }
        }
    }
}
