/*
 * File: InventoryController.cs
 * Author: Athuluwage T.N
 * Description: This file contains the InventoryController, which handles inventory management operations such as retrieving, adding, updating, and removing inventory items. It also includes functionality to check for low stock levels and notify vendors.
 * Created: 08/10/2024
 */

using EcommerceSystem.Models;
using EcommerceSystem.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EcommerceSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryService _inventoryService;

        public InventoryController(InventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        //get all inventories

        [HttpGet]
        public async Task<IActionResult> GetInventory()
        {
            var inventory = await _inventoryService.GetInventoryAsync();
            return Ok(inventory);
        }

        // add inventory
        [HttpPost]
        public async Task<IActionResult> AddInventoryItem([FromBody] InventoryItem item)
        {
            await _inventoryService.AddInventoryItemAsync(item);
            return Ok("Inventory item added successfully");
        }

        //update the inventory

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateStock(string productId, [FromBody] int newQuantity)
        {
            await _inventoryService.UpdateStockAsync(productId, newQuantity);
            await _inventoryService.NotifyLowStockAsync(productId); // Check for low stock
            return Ok("Stock updated successfully");
        }


        //delete by product id
        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveInventoryItem(string productId)
        {
            await _inventoryService.RemoveInventoryItemAsync(productId);
            return Ok("Inventory item removed successfully");
        }
    }
}
