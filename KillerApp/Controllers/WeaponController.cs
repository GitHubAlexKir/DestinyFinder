using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.WeaponRepo;
using System.IO;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class WeaponController : Controller
  {
    private IWeaponRepo weaponRepo;

    public WeaponController()
    {
      weaponRepo = new WeaponRepo();
    }
    //Wapen toevoegen
    [HttpPost]
    public IActionResult addWeapon([FromBody] dynamic weapon)
    {
      string name = weapon.name;
      int damage = weapon.damage;
      int minlevel = weapon.minlevel;
      int playerID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        weaponRepo.addWeapon(name, damage, minlevel, playerID);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //wapen verwijderen
    [HttpPost]
    public IActionResult deleteWeapon([FromBody] dynamic weapon)
    {
      int ID = weapon.id;
      try
      {
        weaponRepo.deleteWeapon(ID);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //wapen veranderen
    [HttpPost]
    public IActionResult editWeapon([FromBody] dynamic weapon)
    {
      try
      {
        string name = weapon.name;
        int damage = weapon.damage;
        int minlevel = weapon.minlevel;
        int weaponID = weapon.ID;

        weaponRepo.editWeapon(name, damage, minlevel, weaponID);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);

      }

    }
    //Query wapens boven damage 300 ophalen
    [HttpPost]
    public JsonResult getBest()
    {
      try
      {
        return Json(weaponRepo.getBestWeapons());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);

      }

    }
    //Query alle wapens ophalen
    [HttpPost]
    public JsonResult getAllWeapons()
    {
      try
      {
        return Json(weaponRepo.getAllWeapons());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);

      }

    }
    //Query totaal aantal wapens per speler ophalen
    [HttpPost]
    public JsonResult getTotalWeapons()
    {
      try
      {
        return Json(weaponRepo.getTotalWeapons());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);

      }

    }
    //Query alle wapens ophalen per speler gesorteerd op totaal aantal
    [HttpPost]
    public JsonResult getTotalWeaponsSorted()
    {
      try
      {
        return Json(weaponRepo.getTotalWeaponsSorted());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);

      }

    }
    //trigger random weapon
    [HttpPost]
    public IActionResult random([FromBody] int playerlevel)
    {
      try
      {
        int playerID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        weaponRepo.random(playerID, playerlevel);
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