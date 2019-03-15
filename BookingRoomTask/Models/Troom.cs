using System;
using System.Collections.Generic;

namespace BookingRoomTask.Models
{
    public partial class Troom
    {
        public Troom()
        {
            Tevent = new HashSet<Tevent>();
        }

        public string Name { get; set; }
        public int NumSeat { get; set; }
        public bool HaveProjector { get; set; }
        public bool HaveBoard { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }

        public ICollection<Tevent> Tevent { get; set; }
    }
}
