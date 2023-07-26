using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webapi.Services;

namespace webapi.Test.Services
{
    public class Base64EncoderTests
    {
        [Fact]
        public void Encode_ShouldReturnValidBase64String()
        {
            // Arrange
            var encoder = new Base64Encoder();
            var input = "Hello, World!";

            // Act
            var result = encoder.Encode(input);

            // Assert
            Assert.NotNull(result);
            Assert.NotEmpty(result);
            Assert.Equal(Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input)), result);
        }

        [Fact]
        public void Encode_ShouldReturnEmptyString_ForNullOrEmptyInput()
        {
            // Arrange
            var encoder = new Base64Encoder();
            string nullInput = null;
            string emptyInput = string.Empty;

            // Act
            var resultNull = encoder.Encode(nullInput);
            var resultEmpty = encoder.Encode(emptyInput);

            // Assert
            Assert.NotNull(resultNull);
            Assert.NotNull(resultEmpty);
            Assert.Equal(string.Empty, resultNull);
            Assert.Equal(string.Empty, resultEmpty);
        }
    }
}
