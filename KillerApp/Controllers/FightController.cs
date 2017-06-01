using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.UserRepo;

namespace KillerApp.Controllers
{

  [Route("api/[controller]/[action]")]
  public class FightController : Controller
  {
    private IPlayerRepo playerRepo;

    public FightController()
    {
      playerRepo = new PlayerRepo();
    }
    //Fight uitvoeren en een boolean terug geven van verloren of gewonnen
    [HttpPost]
    public bool fight([FromBody] dynamic fight)
    {
      int challengerHP = fight.player;
      int opponentID = fight.opponement;
      int weaponID = fight.weapon;
      bool fightResult = playerRepo.Fight(challengerHP, opponentID, weaponID);
      if (fightResult)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    //rewards bepalen en als string terug geven
    [HttpPost]
    public string getReward([FromBody] int ID)
    {
      return playerRepo.getRewards(ID);
    }
  }
}
