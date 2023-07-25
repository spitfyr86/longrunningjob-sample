using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthenticationController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel user)
        {
            if (user is null)
            {
                return BadRequest("Invalid user request!!!");
            }

            if (user.UserName == "admin" && user.Password == "admin")
            {
                var jwtConfiguration = _config.GetSection("JWT");
                var jwtSecret = jwtConfiguration["Secret"];
                var jwtIssuer = jwtConfiguration["ValidIssuer"];
                var jwtAudience = jwtConfiguration["ValidAudience"];

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                                    issuer: jwtIssuer,
                                    audience: jwtAudience,
                                    claims: new List<Claim>(),
                                    expires: DateTime.Now.AddMinutes(6),
                                    signingCredentials: signinCredentials);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new JWTTokenResponse
                {
                    Token = tokenString
                });
            }

            return Unauthorized();
        }
    }
}
