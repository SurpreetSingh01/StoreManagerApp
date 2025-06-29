using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagerApp.Server.Data;
using StoreManagerApp.Server.Models;

namespace StoreManagerApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SaleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SaleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .ToListAsync();

            return Ok(sales);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sale sale)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();
            return Ok(sale);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null) return NotFound();
            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
