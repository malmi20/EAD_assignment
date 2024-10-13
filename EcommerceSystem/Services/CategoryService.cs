/*
 * File: InventoryService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the InventoryService class, responsible for handling operations related to inventory management in the E-commerce system. It includes methods for retrieving inventory items, updating stock, adding and removing items, and notifying vendors when stock levels are low.
 * Created: 08/10/2024
 */

using EcommerceSystem.Data;
using EcommerceSystem.Models;
using MongoDB.Driver;

namespace EcommerceSystem.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _category;

        public CategoryService(MongoDbContext dbContext)
        {
            _category = dbContext.Categories;
        }

        public async Task<List<Category>> GetCategoryAsync() =>
            await _category.Find(item => true).ToListAsync();

    }
}
