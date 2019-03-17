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
    public class UserController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Tuser> Get()
        {
            ModelUser users = new ModelUser();
            return users.GetAll();
        }

        // GET: api/<controller>/role
        [HttpGet("role")]
        public IEnumerable<Trole> GetRoles()
        {
            ModelUser users = new ModelUser();
            return users.GetAllRoles();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Tuser Get(int id)
        {
            ModelUser users = new ModelUser();
            return users.GetById(id);
        }

        // POST api/<controller>
        [HttpPost]
        public int Post(Tuser user)
        {
            ModelUser users = new ModelUser();
            return users.Add(user);
        }

        // PUT api/<controller>
        [HttpPut]
        public int Put(Tuser user)
        {
            ModelUser users = new ModelUser();
            return users.Update(user);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            ModelUser users = new ModelUser();
            users.Delete(id);
            return id;
        }
    }
}
