using Microsoft.AspNetCore.SignalR;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webapi.Services;
using webapi.SignalR;

namespace webapi.Test.Services
{
    public class JobServiceTests
    {
        [Fact]
        public async Task ProcessTextAsync_ShouldSendEncodedMessageForEachCharacter()
        {
            // Arrange
            var messageHubMock = new Mock<IHubContext<MessageHub, IMessageHubClient>>();
            //var jobService = new JobService(messageHubMock.Object);
            string text = "Hello, World!";

            // Act
            //await jobService.ProcessTextAsync(text);

            // Assert
            foreach (char c in text)
            {
                messageHubMock.Verify(
                    hub => hub.Clients.All.SendEncodedMessageAsync(c),
                    Times.Once
                );
            }
        }
    }

}
