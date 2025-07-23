// using CollegeSocialNetwork.Models;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace CollegeSocialNetwork.Controllers
// {
//     public class AdminDashboardController : Controller
//     {
//         private readonly ApplicationDbContext db;
//         public AdminDashboardController(ApplicationDbContext _db)
//         {
//             db = _db;
//         }
//         public async Task<IActionResult> Index()
//         {
//             var users = db.Users.ToList(); // or apply filters if needed
//             ViewBag.TotalStudents = db.Users.Count(u => u.Role == "student");
//             ViewBag.TotalQuestions = db.Questions.Count(); // assuming you have a Questions table
//             ViewBag.TotalAnswers = db.Answers.Count();     // assuming you have an Answers table
//             ViewBag.Profiles = await db.Profiles.ToListAsync();
//             return View(users);
//         }
     

        
//         public IActionResult DeleteUser(int id)
//         {
//             var user = db.Users.Find(id);
//             if (user == null) return NotFound();

//             db.Users.Remove(user);
//             db.SaveChanges();
//             return RedirectToAction("ManageUsers");
//         }
//     }
// }
const connection = require("../config/connection")
const deleteUser = (req,res)=>{
    const id = req.params.id;
    const sql = "DELETE * FROM `Users` WHERE `id` = ?";
    connection.query(sql, [id], (err, data)=>{
        if(err){
            return res.json(err)
        }
        else{
            return res.json(data);
        }
    })
}

module.exports = deleteUser;