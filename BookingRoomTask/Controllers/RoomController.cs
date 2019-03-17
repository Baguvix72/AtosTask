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
            ModelRoom rooms = new ModelRoom();
            return rooms.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Troom Get(int id)
        {
            ModelRoom rooms = new ModelRoom();
            return rooms.GetById(id);
        }

        // POST api/<controller>
        [HttpPost]
        public int Post(Troom room)
        {
            ModelRoom rooms = new ModelRoom();
            return rooms.Add(room);
        }

        // PUT api/<controller>
        [HttpPut]
        public int Put(Troom room)
        {
            ModelRoom rooms = new ModelRoom();
            return rooms.Update(room);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            ModelRoom rooms = new ModelRoom();
            rooms.Delete(id);
            return id;
        }
    }
}
