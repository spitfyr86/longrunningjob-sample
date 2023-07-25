namespace webapi.Services
{
    public class Base64Encoder : ITextEncoder
    {
        public string Encode(string input)
        {
            if (input == null)
            {
                return string.Empty;
            }

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(input);

            return Convert.ToBase64String(plainTextBytes);
        }
    }
}