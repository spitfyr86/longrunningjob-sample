using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class MessageView
    {
        public required string MessageText { get; set; }
        public string? EncodedMsg { get; set; }
        public DateTime RequestSent { get; set; }
    }
}
