using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookingRoomTask.Models
{
    public class ModelEvent
    {
        public IEnumerable<RoomAndEvent> GetList()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            DateTime EndToday = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59);
            var query =
                from el in db.Tevent
                where el.FinishTime > DateTime.Today && el.StartTime < EndToday
                select el;
            List<Tevent> result = query.ToList();

            //Получаем самое раннее забронированное время для комнаты.
            result = result.GroupBy(x => x.IdRoom)
                           .Select(x => x.OrderBy(y => y.StartTime))
                           .Select(x => x.First())
                           .ToList();

            var roomAndEvent =
                from room in db.Troom
                join ev in result on room.Id equals ev.IdRoom into u
                from ev in u.DefaultIfEmpty()
                select new RoomAndEvent
                {
                    Id = room.Id,
                    Name = room.Name,
                    HaveBoard = room.HaveBoard,
                    HaveProjector = room.HaveProjector,
                    NumSeat = room.NumSeat,
                    Tevent = ev,
                };

            return roomAndEvent.ToList();
        }

        public Tuser GetById(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            //При вытаскивании роли при помощи include, во фронт передается null.
            //Поэтому так странно.
            var query =
                from user in db.Tuser
                join role in db.Trole on user.IdRole equals role.Id
                where user.Id == id
                select new Tuser
                {
                    Id = user.Id,
                    Hash = user.Hash,
                    IdRole = user.IdRole,
                    IdRoleNavigation = role,
                    Login = user.Login,
                    Tevent = user.Tevent,
                };

            return query.First();
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
