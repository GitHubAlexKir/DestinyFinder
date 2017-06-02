using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.UserRepo;
using KillerApp.enitities;

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
      if (playerRepo.register(name, password, classID))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    //speler ophalen
    [HttpPost]
    public JsonResult get()
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      return Json(playerRepo.getPlayer(ID));
    }
    //alle spelers ophalen
    [HttpPost]
    public JsonResult getPlayers()
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      return Json(playerRepo.getPlayers(ID));
    }
    //Query gemiddelde wapen damage
    [HttpPost]
    public JsonResult getAvg()
    {
      return Json(playerRepo.getAvg());
    }
    //Query aantal spelers per klasse
    [HttpPost]
    public JsonResult getTotalClass()
    {
      return Json(playerRepo.getTotalClass());
    }
    //speler updaten
    [HttpPost]
    public void update([FromBody] dynamic user)
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
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
    }

  }
}