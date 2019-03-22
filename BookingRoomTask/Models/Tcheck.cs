using System;
using System.Collections.Generic;

namespace BookingRoomTask.Models
{
    public partial class Tcheck
    {
        public int Id { get; set; }
        public int IdEvent { get; set; }
        public int IdUser { get; set; }
        public bool Status { get; set; }

        public Tevent IdEventNavigation { get; set; }
        public Tuser IdUserNavigation { get; set; }
    }
}
