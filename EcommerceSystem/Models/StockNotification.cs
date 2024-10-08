/*
 * File: StockNotification.cs
 * Author: Athuluwage T.N
 * Description: This file contains the StockNotification class, which represents a notification sent to vendors when stock levels are low. It includes properties for the vendor's unique identifier, the product name, and the notification message.
 * Created: 08/10/2024
 */

namespace EcommerceSystem.Models
{
    public class StockNotification
    {
        public string VendorId { get; set; }
        public string ProductName { get; set; }
        public string Message { get; set; }
    }
}
