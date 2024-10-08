/*
 * File: MongoDbContext.cs
 * Author: Athuluwage T.N
 * Description: This file contains the MongoDbContext class, which is responsible for connecting to the MongoDB database and providing access to the various collections used in the E-commerce system, including Users, Roles, Products, Categories, Orders, and InventoryItems.
 * Created: 08/10/2024
 */

using MongoDB.Driver;
using EcommerceSystem.Models;
using Microsoft.Extensions.Configuration;

namespace EcommerceSystem.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _db;

        public MongoDbContext(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetSection("MongoDbSettings:ConnectionString").Value);
            _db = client.GetDatabase(configuration.GetSection("MongoDbSettings:DatabaseName").Value);
        }

        // Property to access the "Users" collection in the MongoDB database.
        public IMongoCollection<ApplicationUser> Users => _db.GetCollection<ApplicationUser>("Users");

        // Property to access the "Roles" collection in the MongoDB database.
        public IMongoCollection<RoleModel> Roles => _db.GetCollection<RoleModel>("Roles");

        // Property to access the "Products" collection in the MongoDB database.
        public IMongoCollection<Product> Products => _db.GetCollection<Product>("Products");

        // Property to access the "Categories" collection in the MongoDB database.
        public IMongoCollection<Category> Categories => _db.GetCollection<Category>("Categories");

        // Property to access the "Orders" collection in the MongoDB database.
        public IMongoCollection<Order> Orders => _db.GetCollection<Order>("Orders");

        // Property to access the "InventoryItems" collection in the MongoDB database.
        public IMongoCollection<InventoryItem> Inventory =>
           _db.GetCollection<InventoryItem>("InventoryItems");

    }
}
