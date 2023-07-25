using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.SignalR
{
    public class MessageHub : Hub<IMessageHubClient>
    {
        public Task SendEncodedMessageAsync(char encodedCharacter)
        {
            return Clients.All.SendEncodedMessageAsync(encodedCharacter);
        }

    }
}
