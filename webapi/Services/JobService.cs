using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using System.Collections;
using System.Threading;
using webapi.Data;
using webapi.Services.Interfaces;
using webapi.SignalR;

namespace webapi.Services
{
    public class JobService : IJobService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;

        public JobService(IHubContext<MessageHub, IMessageHubClient> messageHub, IMemoryCache memoryCache)
        {
            _messageHub = messageHub;
            _memoryCache = memoryCache;
        }

        public async Task<int> ProcessTextAsync(string text, CancellationToken cancellationToken)
        {
            try
            {
                foreach (char c in text)
                {
                    var rnd = new Random();
                    int second = rnd.Next(1, 5);

                    cancellationToken.ThrowIfCancellationRequested();
                    Thread.Sleep(second * 1000);

                    var 
                        cancellationTokenSource = _memoryCache.Get<CancellationTokenSource>(CacheKeys.EncodeRequest);

                    // Check if the process is running and not canceled
                    if (cancellationTokenSource != null && !cancellationTokenSource.IsCancellationRequested)
                    {
                        await _messageHub.Clients.All.SendEncodedMessageAsync(c);
                    }
                }

                return text.Length;     // return above gt 0 count indicating success
            }
            catch (OperationCanceledException)
            {
                // Log the cancellation if required.
                Console.WriteLine("Process cancelled.");

                return 1;   // return above gt 0 count indicating success
            }
            catch
            {
                // Log exception here.
                throw;
            }
            finally
            {
                _memoryCache.Remove(CacheKeys.EncodeRequest);
            }
        }
    }
}
