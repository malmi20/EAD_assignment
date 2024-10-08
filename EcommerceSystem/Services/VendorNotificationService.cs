/*
 * File: VendorNotificationService.cs
 * Author: Athuluwage T.N
 * Description: This file contains the VendorNotificationService class, responsible for sending notifications to vendors regarding stock levels. The service can be extended to support various notification methods, including email, SMS, and in-app notifications.
 * Created: 08/10/2024
 */

using EcommerceSystem.Models;

namespace EcommerceSystem.Notifications
{
    public class VendorNotificationService
    {
        public void SendNotification(StockNotification notification)
        {
            // Logic to notify the vendor (could be email, SMS, in-app notifications)
        }
    }
}
