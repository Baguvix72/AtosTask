using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingRoomTask.Models
{
    public class RoomAndEvent
    {
        public string Name { get; set; }
        public int NumSeat { get; set; }
        public bool HaveProjector { get; set; }
        public bool HaveBoard { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }

        public Tevent Tevent { get; set; }
    }
}
