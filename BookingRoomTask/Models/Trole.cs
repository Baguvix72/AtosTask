using System;
using System.Collections.Generic;

namespace BookingRoomTask.Models
{
    public partial class Trole
    {
        public Trole()
        {
            Tuser = new HashSet<Tuser>();
        }

        public string Name { get; set; }
        public int Id { get; set; }

        public ICollection<Tuser> Tuser { get; set; }
    }
}
