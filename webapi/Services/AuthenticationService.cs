using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Services.Interfaces;

namespace webapi.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration _config;

        public AuthenticationService(IConfiguration config)
        {
            _config = config;
        }

        public Task<string> GenerateTokenAsync()
        {
            var jwtConfiguration = _config.GetSection("JWT");
            var jwtSecret = jwtConfiguration["Secret"];
            var jwtIssuer = jwtConfiguration["ValidIssuer"];
            var jwtAudience = jwtConfiguration["ValidAudience"];

            if (jwtSecret == null || jwtIssuer == null || jwtAudience == null)
            {
                throw new ArgumentException("JWT attributes cannot be null.");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                                issuer: jwtIssuer,
                                audience: jwtAudience,
                                claims: new List<Claim>(),
                                expires: DateTime.Now.AddMinutes(6),
                                signingCredentials: signinCredentials);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Task.FromResult(tokenString);
        }
    }
}
