using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreManagerApp.Server.Data;
using StoreManagerApp.Server.Models;

namespace StoreManagerApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StoreController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stores = await _context.Stores.ToListAsync();
            return Ok(stores);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Store store)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _context.Stores.Add(store);
            await _context.SaveChangesAsync();
            return Ok(store);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var store = await _context.Stores.FindAsync(id);
            if (store == null) return NotFound();
            _context.Stores.Remove(store);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
