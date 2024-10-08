/*
 * File: Program.cs
 * Author: Athuluwage T.N
 * Description: This file configures the ASP.NET Core application, sets up services and middleware for JWT authentication, and initializes the MongoDB context. It registers various services such as OrderService, ProductService, InventoryService, and VendorNotificationService, and defines the HTTP request pipeline.
 * Created: 08/10/2024
 */

using EcommerceSystem.Data;
using EcommerceSystem.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<MongoDbContext>();

// JWT Configuration
var jwtKey = builder.Configuration["Jwt:Key"];
builder.Services.AddSingleton(new TokenService(jwtKey));

// JWT Bearer Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


//services registration ----------------------------------------------------------------
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddSingleton<InventoryService>();
builder.Services.AddSingleton<EcommerceSystem.Notifications.VendorNotificationService>();


builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Display a message when the server starts
Console.WriteLine("Server started on ports 5038 , 7163");

// Run the application
app.Run();
