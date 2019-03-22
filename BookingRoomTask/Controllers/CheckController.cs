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
    public class CheckController : Controller
    {
        // POST api/<controller>
        [HttpPost]
        public int Post(Tcheck tCheck)
        {
            ModelCheck model = new ModelCheck();
            return model.Add(tCheck);
        }
    }
}
