using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.Server.Controllers;
using PlantCareScheduler.Server.Data;
using PlantCareScheduler.Server.Models;

namespace PlantCareScheduler.Tests.Controllers;

public class PlantsControllerTests
{
    private PlantsController _controller;
    private AppDbContext _context;

    [SetUp]
    public void Setup()
    {
        // Configure in-memory database
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);

        // Seed data for tests
        _context.Plants.AddRange(
            new Plant
            {
                Id = Guid.NewGuid(),
                Name = "Aloe Vera",
                Type = "Succulent",
                WateringFrequencyDays = 7,
                LastWateredDate = DateTime.UtcNow.AddDays(-10),
                Location = "Living Room"
            },
            new Plant
            {
                Id = Guid.NewGuid(),
                Name = "Basil",
                Type = "Herb",
                WateringFrequencyDays = 3,
                LastWateredDate = DateTime.UtcNow.AddDays(-1),
                Location = "Kitchen"
            }
        );
        _context.SaveChanges();

        // Initialize controller
        _controller = new PlantsController(_context);
    }

    [TearDown]
    public void Teardown()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task GetPlants_ShouldReturnAllPlants()
    {
        // Act
        var result = await _controller.GetPlants();
        var okResult = result.Result as OkObjectResult;

        // Assert
        Assert.IsNotNull(okResult);
        Assert.That(okResult.StatusCode, Is.EqualTo(200));

        var plants = okResult.Value as List<Plant>;
        Assert.That(plants, Has.Count.EqualTo(2)); // Check seeded data count
    }
    [Test]
    public async Task AddPlant_ShouldAddNewPlant()
    {
        // Arrange
        var newPlant = new Plant
        {
            Id = Guid.NewGuid(),
            Name = "Cactus",
            Type = "Cacti",
            WateringFrequencyDays = 14,
            LastWateredDate = DateTime.UtcNow,
            Location = "Office"
        };

        // Act
        var result = await _controller.AddPlant(newPlant);
        var createdResult = result.Result as CreatedAtActionResult;

        // Assert
        Assert.IsNotNull(createdResult);
        Assert.That(createdResult.StatusCode, Is.EqualTo(201));

        var plantInDb = await _context.Plants.FindAsync(newPlant.Id);
        Assert.IsNotNull(plantInDb);
        Assert.That(plantInDb.Name, Is.EqualTo("Cactus"));
    }

    [Test]
    public async Task WaterPlant_ShouldUpdateLastWateredDate()
    {
        // Arrange
        var plant = await _context.Plants.FirstAsync();
        var originalLastWateredDate = plant.LastWateredDate;

        // Act
        var result = await _controller.WaterPlant(plant.Id);
        var noContentResult = result as NoContentResult;

        // Assert
        Assert.IsNotNull(noContentResult);
        Assert.That(noContentResult.StatusCode, Is.EqualTo(204));

        var updatedPlant = await _context.Plants.FindAsync(plant.Id);
        Assert.IsNotNull(updatedPlant);
        Assert.Greater(updatedPlant.LastWateredDate, originalLastWateredDate);
    }

    [Test]
    public async Task GetPlantsDueForWatering_ShouldReturnOverduePlants()
    {
        // Act
        var result = await _controller.GetPlantsDueForWatering();
        var okResult = result.Result as OkObjectResult;

        // Assert
        Assert.IsNotNull(okResult);
        Assert.That(okResult.StatusCode, Is.EqualTo(200));

        var duePlants = okResult.Value as List<Plant>;
        Assert.That(duePlants, Has.Count.EqualTo(1)); // Only Aloe Vera is overdue
        Assert.That(duePlants[0].Name, Is.EqualTo("Aloe Vera"));
    }
}

