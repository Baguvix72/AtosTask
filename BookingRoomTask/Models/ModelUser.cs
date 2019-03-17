using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookingRoomTask.Models
{
    public class ModelUser
    {
        public IEnumerable<Tuser> GetAll()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            return db.Tuser.ToList();
        }

        public Tuser GetById(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            Tuser user = db.Tuser.Find(id);
            return user;
        }

        public IEnumerable<Trole> GetAllRoles()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            return db.Trole.ToList();
        }

        public int Add(Tuser user)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Tuser.Add(user);
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            Tuser user = db.Tuser.Find(id);
            db.Tuser.Remove(user);
            return db.SaveChanges();
        }

        public int Update(Tuser user)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
            return user.Id;
        }
    }
}
