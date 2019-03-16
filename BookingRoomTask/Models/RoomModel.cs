using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingRoomTask.Models
{
    public class RoomModel
    {
        public IEnumerable<Troom> GetAllRooms()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            return db.Troom.ToList();
        }

        public int AddRoom(Troom room)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Troom.Add(room);
            return db.SaveChanges();
        }
    }
}
