using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;
using webapi.Services.Interfaces;
using webapi.SignalR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly DbContextClass _context;
        private readonly ITextEncoder _textEncoder;
        private readonly IJobService _jobService;
        private readonly IHubContext<MessageHub, IMessageHubClient> _messageHub;

        public MessagesController(IConfiguration config,
            IHubContext<MessageHub, IMessageHubClient> messageHub,
            ITextEncoder textEncoder,
            IJobService jobService,
            DbContextClass context)
        {
            _messageHub = messageHub;
            _textEncoder = textEncoder;
            _context = context;
            _jobService = jobService;
        }

        // GET api/<MessagesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> Get(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            return message;
        }

        // POST api/<MessagesController>
        [HttpPost]
        public async Task<ActionResult<string>> PostAsync([FromBody] MessageView message)
        {
            var convertedMsg = _textEncoder.Encode(message.MessageText);

            var created = _context.Messages.Add(new Message
            {
                EncodedMsg = convertedMsg,
                OriginalMsg = message.MessageText,
                RequestSent = DateTime.UtcNow
            });
            //await _context.SaveChangesAsync();

            await _jobService.ProcessTextAsync(convertedMsg);

            return CreatedAtAction(nameof(Get), new
            {
                id = created.Entity.MessageId
            }, created.Entity);
        }
    }
}
