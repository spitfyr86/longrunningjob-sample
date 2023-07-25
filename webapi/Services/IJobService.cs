using System.Collections;

namespace webapi.Services
{
    public interface IJobService
    {
        Task ProcessTextAsync(string text);    // simulates running of jobs
    }
}
