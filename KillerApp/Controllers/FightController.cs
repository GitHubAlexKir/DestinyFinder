using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.UserRepo;
using System.IO;

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
      try
      {
        return playerRepo.Fight(challengerHP, opponentID, weaponID);
      }
      catch (Exception ex)
      {
        logError(ex);
        return false;
      }
    }
    //rewards bepalen en als string terug geven
    [HttpPost]
    public string getReward()
    {
      int ID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        return playerRepo.getRewards(ID);
      }
      catch (Exception ex)
      {

        logError(ex);
        return "Error";
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
