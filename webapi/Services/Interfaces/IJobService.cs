using System.Collections;

namespace webapi.Services.Interfaces
{
    public interface IJobService
    {
        Task<int> ProcessTextAsync(string text, CancellationToken cancellationToken);    // simulates running of jobs
    }
}
