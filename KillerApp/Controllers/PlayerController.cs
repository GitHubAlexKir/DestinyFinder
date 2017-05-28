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
    [HttpPost]
    public bool register([FromBody] dynamic credentials)
    {
      string name = credentials.name;
      string password = credentials.password;
      string classID = credentials.classID;
      if (playerRepo.register(name,password,classID))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    [HttpPost]
    public JsonResult get([FromBody] int ID)
    {
      return Json(playerRepo.getPlayer(ID));
    }
    [HttpPost]
    public JsonResult getPlayers([FromBody] int ID)
    {
      return Json(playerRepo.getPlayers(ID));
    }

    [HttpPost]
    public void update([FromBody] dynamic user)
    {
      int ID = user.ID;
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
    [HttpPost]
    public bool fight([FromBody] dynamic fight)
    {
      int challengerHP = fight.player;
      int opponentID = fight.opponement;
      int weaponID = fight.weapon;
      bool fightResult = playerRepo.Fight(challengerHP,opponentID,weaponID);
      if (fightResult)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}