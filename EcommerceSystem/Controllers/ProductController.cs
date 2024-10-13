/*
 * File: ProductController.cs
 * Author: Athuluwage T.N
 * Description: This file contains the ProductController, which handles product management operations such as retrieving, creating, updating, and deleting products. It also includes functionality to activate and deactivate products by their MongoDB _id.
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
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        // Get all products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        // Get all products by category
        [HttpGet("filter/{category}")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            var products = await _productService.GetProductsByCategoryAsync(category);
            return Ok(products);
        }

        // Get product by MongoDB generated _id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // Create a new product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            await _productService.CreateProductAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // Update an existing product
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product updatedProduct)
        {
            var existingProduct = await _productService.GetProductByIdAsync(id);
            if (existingProduct == null)
                return NotFound();

            updatedProduct.Id = existingProduct.Id; // Ensure the existing _id is retained
            await _productService.UpdateProductAsync(id, updatedProduct);
            return Ok(updatedProduct);
        }

        // Delete a product by _id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();

            await _productService.DeleteProductAsync(id);
            return NoContent();
        }

        // Activate a product
        [HttpPut("{id}/activate")]
        public async Task<IActionResult> ActivateProduct(string id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();

            await _productService.ActivateProductAsync(id);
            return NoContent();
        }

        // Deactivate a product
        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> DeactivateProduct(string id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();

            await _productService.DeactivateProductAsync(id);
            return NoContent();
        }

    }
}
