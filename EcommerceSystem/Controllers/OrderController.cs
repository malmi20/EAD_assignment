/*
 * File: OrderController.cs
 * Author: Athuluwage T.N
 * Description: This file contains the OrderController, which handles API requests for managing orders, including creating, retrieving, updating, canceling, and dispatching orders.
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
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }


        //create order controller
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            await _orderService.CreateOrderAsync(order);
            return CreatedAtAction(nameof(GetOrderById), new { id = order._id.ToString() }, order);
        }


        //get order by id controller
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(string id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
                return NotFound();
            return Ok(order);
        }


        //update order by id controller
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(string id, [FromBody] Order updatedOrder)
        {
            await _orderService.UpdateOrderAsync(id, updatedOrder);
            return NoContent();
        }

        //delete order by id controller

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelOrder(string id)
        {
            await _orderService.CancelOrderAsync(id);
            return NoContent();
        }

        //dispatch order controller

        [HttpPut("{id}/dispatch")]
        public async Task<IActionResult> DispatchOrder(string id)
        {
            await _orderService.DispatchOrderAsync(id);
            return NoContent();
        }
    }
}
