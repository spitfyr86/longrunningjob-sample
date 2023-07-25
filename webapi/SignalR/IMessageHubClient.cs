using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapi.SignalR
{
    public interface IMessageHubClient
    {
        Task SendEncodedMessageAsync(char encodedCharacter);
    }
}
