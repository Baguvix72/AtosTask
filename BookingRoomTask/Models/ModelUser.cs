using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookingRoomTask.Models
{
    public class ModelUser
    {
        public IEnumerable<Tuser> GetAll()
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            var query =
                from user in db.Tuser
                join role in db.Trole on user.IdRole equals role.Id
                select new Tuser
                {
                    Id = user.Id,
                    Hash = user.Login,
                    IdRole = user.IdRole,
                    IdRoleNavigation = role,
                    Login = user.Login,
                    Tevent = user.Tevent,
                };

            return query.ToList();
        }

        public Tuser GetById(int id)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            var query =
                from user in db.Tuser
                join role in db.Trole on user.IdRole equals role.Id
                where user.Id == id
                select new Tuser
                {
                    Id = user.Id,
                    Hash = user.Login,
                    IdRole = user.IdRole,
                    IdRoleNavigation = role,
                    Login = user.Login,
                    Tevent = user.Tevent,
                };

            return query.First();
        }

        public Tuser GetByLogin(string login)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            var query =
                from user in db.Tuser
                join role in db.Trole on user.IdRole equals role.Id
                where user.Login == login
                select new Tuser
                {
                    Id = user.Id,
                    Hash = user.Hash,
                    IdRole = user.IdRole,
                    IdRoleNavigation = role,
                    Login = user.Login,
                    Tevent = user.Tevent,
                };

            return query.FirstOrDefault();
        }

        public Tuser GetByHash(string hash)
        {
            BookingRoomTaskContext db = new BookingRoomTaskContext();

            var query =
                from user in db.Tuser
                join role in db.Trole on user.IdRole equals role.Id
                where user.Hash == hash
                select new Tuser
                {
                    Id = user.Id,
                    Hash = user.Hash,
                    IdRole = user.IdRole,
                    IdRoleNavigation = role,
                    Login = user.Login,
                    Tevent = user.Tevent,
                };

            return query.FirstOrDefault();
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
