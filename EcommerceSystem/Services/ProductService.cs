/*
 * File: ProductService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the ProductService class, which is responsible for managing products in the E-commerce system. It includes methods for retrieving all products, retrieving a product by its MongoDB generated _id, creating new products, updating existing products, deleting products, and activating/deactivating products.
 * Created: 08/10/2024
 */

using EcommerceSystem.Data;
using EcommerceSystem.Models;
using MongoDB.Driver;
using MongoDB.Bson; // For ObjectId
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommerceSystem.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(MongoDbContext dbContext)
        {
            _products = dbContext.Products;
        }

        // Get all products
        public async Task<List<Product>> GetProductsAsync() =>
            await _products.Find(product => true).ToListAsync();

        // Get all products by category
        public async Task<List<Product>> GetProductsByCategoryAsync(string category) =>
            await _products.Find(product => product.Category == category).ToListAsync();

        // Get product by MongoDB generated _id
        public async Task<Product> GetProductByIdAsync(string id)
        {
            var objectId = new ObjectId(id); // Convert string id to ObjectId
            return await _products.Find(product => product.Id == objectId.ToString()).FirstOrDefaultAsync();
        }

        // Create a new product
        public async Task CreateProductAsync(Product product) =>
            await _products.InsertOneAsync(product);

        // Update an existing product
        public async Task UpdateProductAsync(string id, Product updatedProduct)
        {
            var objectId = new ObjectId(id); // Convert string id to ObjectId
            await _products.ReplaceOneAsync(product => product.Id == objectId.ToString(), updatedProduct);
        }

        // Delete a product by _id
        public async Task DeleteProductAsync(string id)
        {
            var objectId = new ObjectId(id); // Convert string id to ObjectId
            await _products.DeleteOneAsync(product => product.Id == objectId.ToString());
        }

        // Activate a product
        public async Task ActivateProductAsync(string id)
        {
            var objectId = new ObjectId(id); // Convert string id to ObjectId
            await _products.UpdateOneAsync(
                product => product.Id == objectId.ToString(),
                Builders<Product>.Update.Set(p => p.IsActive, true)
            );
        }

        // Deactivate a product
        public async Task DeactivateProductAsync(string id)
        {
            var objectId = new ObjectId(id); // Convert string id to ObjectId
            await _products.UpdateOneAsync(
                product => product.Id == objectId.ToString(),
                Builders<Product>.Update.Set(p => p.IsActive, false)
            );
        }
    }
}
