using System.Text.Json.Serialization;

namespace PlantCareScheduler.Server.Models;

public class Plant
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }
    [JsonPropertyName("name")]
    public string? Name { get; set; }
    [JsonPropertyName("type")]
    public string? Type { get; set; } // 'succulent', 'tropical', etc.
    [JsonPropertyName("wateringFrequencyDays")]
    public int WateringFrequencyDays { get; set; }
    [JsonPropertyName("lastWateredDate")]
    public DateTime LastWateredDate { get; set; }
    [JsonPropertyName("location")]
    public string? Location { get; set; }
}
