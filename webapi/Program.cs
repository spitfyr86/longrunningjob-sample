using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using webapi.Data;
using webapi.Services;
using webapi.Services.Interfaces;
using webapi.SignalR;

// create builder
var builder = WebApplication.CreateBuilder(args);


// Add services to the container -------------------------------------------------------------------------------

builder.Services.AddSignalR();
builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy", 
        builder => builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetIsOriginAllowed((hosts) => true));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("V1", new OpenApiInfo
    {
        Version = "V1",
        Title = "WebAPI",
        Description = "Message Converter WebAPI"
    });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                }
            },
            new List < string > ()
        }
    });
});

builder.Services.AddMemoryCache();

var jwtConfiguration = builder.Configuration.GetSection("JWT");
var jwtSecret = jwtConfiguration["Secret"];
var jwtIssuer = jwtConfiguration["ValidIssuer"];
var jwtAudience = jwtConfiguration["ValidAudience"];

builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
    };
});

// IoC
builder.Services.AddScoped<ITextEncoder, Base64Encoder>();
builder.Services.AddScoped<IJobService, JobService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

var app = builder.Build();
// -----------------------------------------------------------------------------------------------------



// Configure the HTTP request pipeline. ----------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/V1/swagger.json", "Message Converter WebAPI");
    });
}

app.UseCors("CORSPolicy");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
#pragma warning disable ASP0014 // Suggest using top level route registrations
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapHub<MessageHub>("/encodeText");        // URL to listen for SignalR requests handling
});
#pragma warning restore ASP0014 // Suggest using top level route registrations
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

// -----------------------------------------------------------------------------------------------------