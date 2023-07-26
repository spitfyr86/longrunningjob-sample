using System.Collections;

namespace webapi.Services.Interfaces
{
    public interface IJobService
    {
        Task ProcessTextAsync(string text);    // simulates running of jobs
    }
}
