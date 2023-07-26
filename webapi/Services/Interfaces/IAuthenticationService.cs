namespace webapi.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<string> GenerateTokenAsync();
    }
}
