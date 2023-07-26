using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using webapi.Data;
using webapi.Services;
using webapi.SignalR;

namespace webapi.Test.Services
{
    public class JobServiceTests
    {
        [Fact]
        public async Task ProcessTextAsync_SuccessfulProcessing_ReturnsTextLength()
        {
            // Arrange
            var text = "Hello, world!";
            var cancellationToken = CancellationToken.None;
            var memoryCache = new MemoryCache(new MemoryCacheOptions());
            var messageHubMock = new Mock<IHubContext<MessageHub, IMessageHubClient>>();
            var jobService = new JobService(messageHubMock.Object, memoryCache);

            // Act
            var result = await jobService.ProcessTextAsync(text, cancellationToken);

            // Assert
            Assert.Equal(text.Length, result);
        }

        [Fact]
        public async Task ProcessTextAsync_NoCancellationRequested_MessagesSent()
        {
            // Arrange
            var text = "Hello!";
            var cancellationToken = CancellationToken.None;
            var cancellationTokenSource = new CancellationTokenSource();

            var memoryCache = new MemoryCache(new MemoryCacheOptions());
            var mockMsgHubClient = new Mock<IMessageHubClient>();
            var mockHubClients = new Mock<IHubClients<IMessageHubClient>>();
            var messageHubMock = new Mock<IHubContext<MessageHub, IMessageHubClient>>();

            memoryCache.Set(CacheKeys.EncodeRequest, cancellationTokenSource);
            mockHubClients.Setup(x => x.All).Returns(mockMsgHubClient.Object);
            messageHubMock.Setup(x => x.Clients).Returns(mockHubClients.Object);

            var jobService = new JobService(messageHubMock.Object, memoryCache);

            // Act
            await jobService.ProcessTextAsync(text, cancellationToken);

            // Assert
            messageHubMock.Verify(
                hub => hub.Clients.All.SendEncodedMessageAsync(It.IsAny<char>()),
                Times.Exactly(text.Length)
            );
        }
    }

}
