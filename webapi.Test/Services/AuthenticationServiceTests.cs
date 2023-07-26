using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webapi.Services;

namespace webapi.Test.Services
{
    public class AuthenticationServiceTests
    {
        [Fact]
        public async Task GenerateTokenAsync_ShouldReturnValidJwtToken()
        {
            // Arrange
            var jwtSecret = "mySecretKey";
            var jwtIssuer = "myIssuer";
            var jwtAudience = "myAudience";

            var configurationMock = new Mock<IConfiguration>();
            configurationMock.Setup(config => config.GetSection("JWT")["Secret"]).Returns(jwtSecret);
            configurationMock.Setup(config => config.GetSection("JWT")["ValidIssuer"]).Returns(jwtIssuer);
            configurationMock.Setup(config => config.GetSection("JWT")["ValidAudience"]).Returns(jwtAudience);

            var authenticationService = new AuthenticationService(configurationMock.Object);

            // Act
            var token = await authenticationService.GenerateTokenAsync();

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);

            // Decode and validate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,
                ValidateAudience = true,
                ValidAudience = jwtAudience,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
            }, out _);

            Assert.True(claimsPrincipal.Identity.IsAuthenticated);
            Assert.Empty(claimsPrincipal.Claims);
        }

        [Fact]
        public async Task GenerateTokenAsync_ShouldThrowArgumentException_WhenJWTAttributesAreMissing()
        {
            // Arrange
            var configurationMock = new Mock<IConfiguration>();
            var authenticationService = new AuthenticationService(configurationMock.Object);

            // Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => authenticationService.GenerateTokenAsync());
        }
    }
}
