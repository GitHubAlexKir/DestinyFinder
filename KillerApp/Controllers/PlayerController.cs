using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.UserRepo;
using KillerApp.enitities;
using System.IO;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class PlayerController : Controller
  {
    private IPlayerRepo playerRepo;

    public PlayerController()
    {
      playerRepo = new PlayerRepo();
    }
    //registreren en controleren of naam al bezet is
    [HttpPost]
    public bool register([FromBody] dynamic credentials)
    {
      string name = credentials.name;
      string password = credentials.password;
      string classID = credentials.classID;
      try
      {
        return playerRepo.register(name, password, classID);
      }
      catch (Exception ex)
      {
        logError(ex);
        return false;
      }

    }
    //speler ophalen
    [HttpPost]
    public JsonResult get()
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        return Json(playerRepo.getPlayer(ID));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    //alle spelers ophalen
    [HttpPost]
    public JsonResult getPlayers()
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        return Json(playerRepo.getPlayers(ID));
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }
    }
    //Query gemiddelde wapen damage
    [HttpPost]
    public JsonResult getAvg()
    {
      try
      {
        return Json(playerRepo.getAvg());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    //Query aantal spelers per klasse
    [HttpPost]
    public JsonResult getTotalClass()
    {
      try
      {
        return Json(playerRepo.getTotalClass());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }
    //speler updaten
    [HttpPost]
    public IActionResult update([FromBody] dynamic user)
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        string className = user.className;
        int classID = 1;
        int level = user.level;
        int HP = user.HP;
        int XP = user.XP;
        switch (className)
        {
          case "Hunter":
            classID = 1;
            break;
          case "Titan":
            classID = 2;
            break;
          case "Warlock":
            classID = 3;
            break;
        }
        playerRepo.updatePlayer(ID, classID, HP, level, XP);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    private void logError(Exception ex)
    {
      string strPath = @"error.txt";
      if (!System.IO.File.Exists(strPath))
      {
        System.IO.File.Create(strPath).Dispose();
      }
      using (StreamWriter sw = System.IO.File.AppendText(strPath))
      {
        sw.WriteLine("=============Error Logging ===========");
        sw.WriteLine("===========Start============= " + DateTime.Now);
        sw.WriteLine("Error Message: " + ex.Message);
        sw.WriteLine("Stack Trace: " + ex.StackTrace);
        sw.WriteLine("===========End============= " + DateTime.Now);
      }
    }

  }
}