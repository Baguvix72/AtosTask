﻿using System;
using System.Collections.Generic;

namespace BookingRoomTask.Models
{
    public partial class Tuser
    {
        public Tuser()
        {
            Tevent = new HashSet<Tevent>();
        }

        public string Login { get; set; }
        public string Hash { get; set; }
        public int IdRole { get; set; }
        public int Id { get; set; }

        public Trole IdRoleNavigation { get; set; }
        public ICollection<Tevent> Tevent { get; set; }
    }
}
