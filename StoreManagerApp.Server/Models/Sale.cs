﻿// Models/Sale.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StoreManagerApp.Server.Models
{
    public class Sale
    {
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int StoreId { get; set; }

        [Required]
        public DateTime DateSold { get; set; }

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }

        [ForeignKey("CustomerId")]
        public Customer? Customer { get; set; }

        [ForeignKey("StoreId")]
        public Store? Store { get; set; }
    }
}
