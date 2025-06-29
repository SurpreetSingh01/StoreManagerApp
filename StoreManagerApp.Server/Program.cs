using Microsoft.EntityFrameworkCore;
using StoreManagerApp.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register AppDbContext using SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy to allow frontend (React) to access backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactClient", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // React dev server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Use static files and default files (for React build)
app.UseDefaultFiles();
app.UseStaticFiles();

// Use Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS before anything else that needs it
app.UseCors("AllowReactClient");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// If no API route matches, serve index.html (React app)
app.MapFallbackToFile("/index.html");

app.Run();
