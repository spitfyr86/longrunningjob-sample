using Microsoft.AspNetCore.SignalR;
using System.Collections;
using webapi.SignalR;

namespace webapi.Services
{
    public class JobService : IJobService
    {
        private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;

        public JobService(IHubContext<MessageHub, IMessageHubClient> messageHub)
        {
            _messageHub = messageHub;
        }

        public async Task ProcessTextAsync(string text)
        {
            foreach (char c in text)
            {
                var rnd = new Random();
                int second = rnd.Next(1, 5);

                Thread.Sleep(second * 1000);
                await _messageHub.Clients.All.SendEncodedMessageAsync(c); ;
            }
        }
    }
}
