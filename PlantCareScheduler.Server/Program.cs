using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:57807") // Replace with your frontend URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowFrontendOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
