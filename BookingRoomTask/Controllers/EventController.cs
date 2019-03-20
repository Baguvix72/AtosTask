using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookingRoomTask.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookingRoomTask.Controllers
{
    [Route("api/[controller]")]
    public class EventController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<RoomAndEvent> Get()
        {
            ModelEvent model = new ModelEvent();
            return model.GetList();
        }

        // POST api/<controller>
        [HttpPost]
        public Troom Post(FilterEvents filter)
        {
            ModelEvent model = new ModelEvent();
            return model.GetEventsForRoom(filter);
        }
    }
}
