/*
 * File: InventoryService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the InventoryService class, responsible for handling operations related to inventory management in the E-commerce system. It includes methods for retrieving inventory items, updating stock, adding and removing items, and notifying vendors when stock levels are low.
 * Created: 08/10/2024
 */

using EcommerceSystem.Models;
using MongoDB.Driver;
using EcommerceSystem.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommerceSystem.Services
{
    public class InventoryService
    {
        private readonly IMongoCollection<InventoryItem> _inventory;

        public InventoryService(MongoDbContext dbContext)
        {
            _inventory = dbContext.Inventory;
        }

        public async Task<List<InventoryItem>> GetInventoryAsync() =>
            await _inventory.Find(item => true).ToListAsync();

        public async Task<InventoryItem> GetInventoryItemAsync(string productId) =>
            await _inventory.Find(item => item.ProductId == productId).FirstOrDefaultAsync();

        public async Task AddInventoryItemAsync(InventoryItem item) =>
            await _inventory.InsertOneAsync(item);

        public async Task UpdateStockAsync(string productId, int newQuantity)
        {
            var update = Builders<InventoryItem>.Update.Set(i => i.Quantity, newQuantity);
            await _inventory.UpdateOneAsync(item => item.ProductId == productId, update);
        }

        public async Task RemoveInventoryItemAsync(string productId)
        {
            var productInPendingOrder = false; // Add logic to check if product is in pending order
            if (!productInPendingOrder)
            {
                await _inventory.DeleteOneAsync(item => item.ProductId == productId);
            }
            else
            {
                // Handle case where the product is part of a pending order
            }
        }

        public async Task NotifyLowStockAsync(string productId)
        {
            var product = await GetInventoryItemAsync(productId);
            if (product.Quantity <= product.LowStockThreshold)
            {
                // Send notification to vendor
                // You can call VendorNotificationService here
            }
        }
    }
}
