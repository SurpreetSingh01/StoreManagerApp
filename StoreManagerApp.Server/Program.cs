using Microsoft.EntityFrameworkCore;
using StoreManagerApp.Server.Data;
using StoreManagerApp.Server.Middleware;
using StoreManagerApp.Server.Services; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<ISaleService, SaleService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactClient", policy =>
    {
        policy.WithOrigins("https://localhost:53302")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactClient");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
