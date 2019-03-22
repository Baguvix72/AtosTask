using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingRoomTask.Models
{
    public class ModelCheck
    {
        public int Add(Tcheck tcheck)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Tcheck.Add(tcheck);
            return db.SaveChanges();
        }
    }
}
