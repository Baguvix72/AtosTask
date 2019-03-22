using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookingRoomTask.Models
{
    public class ModelEvent
    {
        /// <summary>
        /// Возвращает список со всеми комнатами и самым ранним запланированным событием
        /// на текущий день. Если события отсутсвтует, тогда в свойстве команты event будет null
        /// </summary>
        /// <returns></returns>
        public IEnumerable<RoomAndEvent> GetList()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            DateTime endToday = new DateTime(DateTime.Now.Year, 
                                        DateTime.Now.Month, 
                                        DateTime.Now.Day, 23, 59, 59);

            var query =
                from el in db.Tevent
                where el.FinishTime > DateTime.Today && el.StartTime < endToday
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

        /// <summary>
        /// Возвращает список событий на указанную дату для указанной комнаты.
        /// </summary>
        /// <param name="filter">Объект для фильтрации событий</param>
        /// <returns></returns>
        public Troom GetEventsForRoom(FilterEvents filter)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            DateTime startDay = new DateTime(filter.DateEvents.Year, 
                                            filter.DateEvents.Month, 
                                            filter.DateEvents.Day, 0, 0, 0);

            DateTime endDay = new DateTime(filter.DateEvents.Year, 
                                            filter.DateEvents.Month, 
                                            filter.DateEvents.Day, 23, 59, 59);
            var query =
                from el in db.Tevent
                where el.FinishTime > startDay 
                    && el.StartTime < endDay 
                    && el.IdRoom == filter.IdRoom
                select el;
            List<Tevent> eventsList = query.ToList();

            var queryRoom =
                from el in db.Troom
                where el.Id == filter.IdRoom
                select new Troom
                {
                    Id = el.Id,
                    HaveBoard = el.HaveBoard,
                    HaveProjector = el.HaveProjector,
                    Name = el.Name,
                    NumSeat = el.NumSeat,
                    Description = el.Description,
                    Tevent = eventsList,
                };

            return queryRoom.First();
        }

        /// <summary>
        /// Возвращает список актуальных событий которые необходимо проверить менеджеру.
        /// Актуальное - которое началось сегодня.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Tevent> GetNewEvents()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            //Получаем id уже проверенных событий
            var query =
                from ev in db.Tevent
                from ch in db.Tcheck
                where ev.Id == ch.IdEvent
                select ev.Id;

            List<int> eventList = query.ToList();

            //Выбираем только те события, которые отсуsтвуют в проверенных
            var queryDontCheck =
                from el in db.Tevent
                join room in db.Troom on el.IdRoom equals room.Id
                join user in db.Tuser on el.IdUser equals user.Id
                where !(eventList.Contains(el.Id)) && el.StartTime > DateTime.Today
                select new Tevent
                {
                    Id = el.Id,
                    Description = el.Description,
                    IdUser = el.IdUser,
                    FinishTime = el.FinishTime,
                    IdRoom = el.IdRoom,
                    IdRoomNavigation = room,
                    IdUserNavigation = user,
                    Name = el.Name,
                    StartTime = el.StartTime,
                };

            List<Tevent> eventsList = queryDontCheck.ToList();
            return eventsList;
        }

        public int Add(Tevent tevent)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();
            db.Tevent.Add(tevent);
            return db.SaveChanges();
        }
    }
}
