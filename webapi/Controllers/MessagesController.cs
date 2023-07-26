using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using webapi.Data;
using webapi.Models;
using webapi.Services.Interfaces;
using webapi.SignalR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;
        private readonly ITextEncoder _textEncoder;
        private readonly IJobService _jobService;

        public MessagesController(
            ITextEncoder textEncoder,
            IJobService jobService,
            IMemoryCache memoryCache)
        {
            _textEncoder = textEncoder;
            _jobService = jobService;
            _memoryCache = memoryCache;
        }

        // POST api/<MessagesController>
        [HttpPost]
        public async Task<ActionResult<string>> PostAsync([FromBody] MessageView message)
        {
            // Check if the process is already running
            var cancellationTokenSource = _memoryCache.Get<CancellationTokenSource>(CacheKeys.EncodeRequest);
            if (cancellationTokenSource != null && !cancellationTokenSource.IsCancellationRequested)
            {
                return BadRequest("A process is currently running.");
            }

            cancellationTokenSource = new CancellationTokenSource();
            _memoryCache.Set(CacheKeys.EncodeRequest, cancellationTokenSource);

            var cancellationToken = cancellationTokenSource.Token;
            var convertedMsg = _textEncoder.Encode(message.MessageText);

            await _jobService.ProcessTextAsync(convertedMsg, cancellationToken);

            return Ok();
        }

        [HttpPost("cancel")]
        public IActionResult CancelLongRunningTask()
        {
            var cancellationTokenSource = _memoryCache.Get<CancellationTokenSource>(CacheKeys.EncodeRequest);

            // Check if the process is running and not already canceled
            if (cancellationTokenSource != null && !cancellationTokenSource.IsCancellationRequested)
            {
                cancellationTokenSource.Cancel();
                cancellationTokenSource.Dispose();
                _memoryCache.Set(CacheKeys.EncodeRequest, cancellationTokenSource);

                return Ok("Long-running task canceled.");
            }

            return BadRequest("The task is not running or already canceled.");
        }

    }
}
