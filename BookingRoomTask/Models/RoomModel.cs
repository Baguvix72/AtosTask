using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookingRoomTask.Models
{
    public class RoomModel
    {
        public IEnumerable<Troom> GetAll()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            return db.Troom.ToList();
        }

        public Troom GetById(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            Troom room = db.Troom.Find(id);
            return room;
        }

        public int Add(Troom room)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Troom.Add(room);
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            Troom room = db.Troom.Find(id);
            db.Troom.Remove(room);
            return db.SaveChanges();
        }

        public int Update(Troom room)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Entry(room).State = EntityState.Modified;
            db.SaveChanges();
            return room.Id;
        }
    }
}
