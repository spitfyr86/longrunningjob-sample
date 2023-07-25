namespace webapi.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string? OriginalMsg { get; set; }
        public string? EncodedMsg { get; set; }
        public DateTime RequestSent { get; set; }
        public string? Sender { get; set; }
    }
}
