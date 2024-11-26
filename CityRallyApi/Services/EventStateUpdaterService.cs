//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Linq;
//using System.Threading;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Hosting;

//public class EventStateUpdaterService : BackgroundService
//{
//    private readonly IServiceProvider _serviceProvider;
//    private readonly ILogger<EventStateUpdaterService> _logger;

//    public EventStateUpdaterService(IServiceProvider serviceProvider, ILogger<EventStateUpdaterService> logger)
//    {
//        _serviceProvider = serviceProvider;
//        _logger = logger;
//    }

//    protected override async Task ExecuteAsync(CancellationToken stoppingToken) // Ensure it returns Task
//    {
//        while (!stoppingToken.IsCancellationRequested)
//        {
//            await Task.Delay(TimeSpan.FromMinutes(60), stoppingToken); // Use async delay

//            using (var scope = _serviceProvider.CreateScope())
//            {
//                var controller = scope.ServiceProvider.GetRequiredService<EventsController>();
//                await controller.UpdateEventState(); // Ensure async call
//            }
//        }
//    }
//}

