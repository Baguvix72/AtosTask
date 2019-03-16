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
    public class RoomController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Troom> Get()
        {
            RoomModel rooms = new RoomModel();
            return rooms.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Troom Get(int id)
        {
            RoomModel rooms = new RoomModel();
            return rooms.GetById(id);
        }

        // POST api/<controller>
        [HttpPost]
        public int Post(Troom room)
        {
            RoomModel rooms = new RoomModel();
            return rooms.Add(room);
        }

        // PUT api/<controller>
        [HttpPut]
        public int Put(Troom room)
        {
            RoomModel rooms = new RoomModel();
            return rooms.Update(room);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            RoomModel rooms = new RoomModel();
            rooms.Delete(id);
            return id;
        }
    }
}
