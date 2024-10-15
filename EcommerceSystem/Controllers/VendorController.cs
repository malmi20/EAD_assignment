using EcommerceSystem.Models;
using EcommerceSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcommerceSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly VendorService _vendorService;

        public VendorController(VendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVendor([FromBody] ApplicationUser vendor)
        {
            if (vendor == null)
            {
                return BadRequest("Vendor data is required.");
            }

            // Call the service to create the vendor
            await _vendorService.CreateVendorAsync(vendor);

            // Return the created vendor, including the auto-generated Id
            return CreatedAtAction(nameof(CreateVendor), new { id = vendor.Id }, vendor);
        }

        // GET: api/vendor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendorsAsync();

            if (vendors == null || vendors.Count == 0)
            {
                return NotFound("No vendors found.");
            }

            return Ok(vendors);
        }
    }
}
