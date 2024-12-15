using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantCareScheduler.Server.Data;
using PlantCareScheduler.Server.Models;

namespace PlantCareScheduler.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlantsController(AppDbContext context)
        {
            _context = context;
        }

        // Helper method to determine urgency level
        private int GetUrgencyLevel(Plant plant)
        {
            var daysSinceLastWatered = (DateTime.UtcNow - plant.LastWateredDate).TotalDays;
            if (daysSinceLastWatered >= plant.WateringFrequencyDays)
            {
                return 1; // Overdue
            }
            else if (daysSinceLastWatered >= plant.WateringFrequencyDays - 3)
            {
                return 2; // Due Soon
            }
            return 3; // OK
        }

        // GET: api/plants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants()
        {
            var plants = await _context.Plants.ToListAsync();

            // Sorting by urgency
            var sortedPlants = plants
                .OrderBy(p => GetUrgencyLevel(p))
                .ThenBy(p => p.LastWateredDate.AddDays(p.WateringFrequencyDays)) // Secondary sort by last watered date
                .ToList();

            return Ok(sortedPlants);
        }

        // POST: api/plants
        [HttpPost]
        public async Task<ActionResult<Plant>> AddPlant(Plant plant)
        {
            plant.Id = Guid.NewGuid();
            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlants), new { id = plant.Id }, plant);
        }

        // PUT: api/plants/{id}/water
        [HttpPut("{id}/water")]
        public async Task<IActionResult> WaterPlant(Guid id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null) return NotFound();

            plant.LastWateredDate = DateTime.Now;
            _context.Entry(plant).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/plants/due
        [HttpGet("due")]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlantsDueForWatering()
        {
            try
            {
                var today = DateTime.UtcNow.Date; // Use UTC for consistency
                var duePlants = await _context.Plants
                    .Where(p => p.LastWateredDate.AddDays(p.WateringFrequencyDays) <= today)
                    .ToListAsync();

                // Sorting by urgency
                var sortedDuePlants = duePlants
                    .OrderBy(p => GetUrgencyLevel(p))
                    .ThenBy(p => p.LastWateredDate.AddDays(p.WateringFrequencyDays)) // Secondary sort by last watered date
                    .ToList();

                return Ok(sortedDuePlants);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
