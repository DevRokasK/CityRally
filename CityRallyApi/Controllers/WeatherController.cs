using Microsoft.AspNetCore.Mvc;

namespace CityRallyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetWeather()
        {
            var weatherData = new
            {
                Temperature = 25,
                Condition = "Sunny"
            };
            return Ok(weatherData);
        }
    }
}