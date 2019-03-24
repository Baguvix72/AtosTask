using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookingRoomTask.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookingRoomTask.Controllers
{
    public class ResultAuth
    {
        public string Message { get; set; }
        public string Hash { get; set; }
        public int Role { get; set; }
        public int User { get; set; }
    }

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
            user = SetHash(user);
            return users.Add(user);
        }

        // POST api/<controller>/check
        [HttpPost("check")]
        public ResultAuth PostCheck(Tuser checkUser)
        {
            ModelUser users = new ModelUser();
            Tuser user = users.GetByLogin(checkUser.Login);
            ResultAuth result = new ResultAuth();

            if (user == null)
            {
                result.Message = "Неверный логин.";
                return result;
            }

            checkUser.IdRole = user.IdRole;
            checkUser = SetHash(checkUser);

            if (user.Hash != checkUser.Hash)
            {
                result.Message = "Неверный пароль.";
                return result;
            }

            result.Hash = checkUser.Hash;
            result.Role = checkUser.IdRole;
            return result;
        }

        // POST api/<controller>/hash
        [HttpPost("hash")]
        public ResultAuth PostHash(string hash)
        {
            ModelUser users = new ModelUser();
            Tuser user = users.GetByHash(hash);

            ResultAuth result = new ResultAuth
            {
                User = (user == null) ? 0 : user.Id,
                Role = (user == null) ? 0 : user.IdRole,
            };
            return result;
        }


        // PUT api/<controller>
        [HttpPut]
        public int Put(Tuser user)
        {
            ModelUser users = new ModelUser();
            user = SetHash(user);
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

        private Tuser SetHash(Tuser tuser)
        {
            string password = tuser.Hash + tuser.IdRole + tuser.Login;

            byte[] arPassword = Encoding.Unicode.GetBytes(password);
            SHA256 hashMaker = SHA256.Create();
            byte[] arHash = hashMaker.ComputeHash(arPassword);

            StringBuilder stringBuilder = new StringBuilder();
            foreach (var item in arHash)
            {
                stringBuilder.Append(item.ToString("x2"));
            }
            string result = stringBuilder.ToString();

            tuser.Hash = result;
            return tuser;
        }
    }
}
