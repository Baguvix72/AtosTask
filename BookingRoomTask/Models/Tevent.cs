using System;
using System.Collections.Generic;

namespace BookingRoomTask.Models
{
    public partial class Tevent
    {
        public Tevent()
        {
            Tcheck = new HashSet<Tcheck>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime FinishTime { get; set; }
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdRoom { get; set; }

        public Troom IdRoomNavigation { get; set; }
        public Tuser IdUserNavigation { get; set; }
        public ICollection<Tcheck> Tcheck { get; set; }
    }
}
