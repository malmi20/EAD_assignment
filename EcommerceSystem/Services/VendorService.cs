using EcommerceSystem.Data;
using EcommerceSystem.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceSystem.Services
{
    public class VendorService
    {
        private readonly MongoDbContext _context;

        public VendorService(MongoDbContext context)
        {
            _context = context;
        }

        public async Task CreateVendorAsync(ApplicationUser vendor)
        {
            await _context.Users.InsertOneAsync(vendor);
        }

        public async Task<List<ApplicationUser>> GetAllVendorsAsync()
        {
            // Fetch all vendors whose role contains "VENDOR"
            return await _context.Users.Find(u => u.Roles.Contains("VENDOR")).ToListAsync();
        }


        // Add other methods for updating, deleting, and retrieving vendors as needed
    }
}
