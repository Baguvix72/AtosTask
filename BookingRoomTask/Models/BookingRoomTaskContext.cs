using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BookingRoomTask.Models
{
    public partial class BookingRoomTaskContext : DbContext
    {
        public BookingRoomTaskContext()
        {
        }

        public BookingRoomTaskContext(DbContextOptions<BookingRoomTaskContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tcheck> Tcheck { get; set; }
        public virtual DbSet<Tevent> Tevent { get; set; }
        public virtual DbSet<Trole> Trole { get; set; }
        public virtual DbSet<Troom> Troom { get; set; }
        public virtual DbSet<Tuser> Tuser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=ASUS-NOTEBOOK;Initial Catalog=BookingRoomTask;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tcheck>(entity =>
            {
                entity.ToTable("TCheck");

                entity.HasOne(d => d.IdEventNavigation)
                    .WithMany(p => p.Tcheck)
                    .HasForeignKey(d => d.IdEvent)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TEvent_TCheck");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Tcheck)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("FK_TUser_TCheck");
            });

            modelBuilder.Entity<Tevent>(entity =>
            {
                entity.ToTable("TEvent");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.FinishTime).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.HasOne(d => d.IdRoomNavigation)
                    .WithMany(p => p.Tevent)
                    .HasForeignKey(d => d.IdRoom)
                    .HasConstraintName("FK_TEvent_TRoom");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Tevent)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("FK_TEvent_TUser");
            });

            modelBuilder.Entity<Trole>(entity =>
            {
                entity.ToTable("TRole");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Troom>(entity =>
            {
                entity.ToTable("TRoom");

                entity.Property(e => e.Description).HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Tuser>(entity =>
            {
                entity.ToTable("TUser");

                entity.Property(e => e.Hash)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.IdRole).HasDefaultValueSql("((1))");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Tuser)
                    .HasForeignKey(d => d.IdRole)
                    .HasConstraintName("FK_TRole_TUser");
            });
        }
    }
}
