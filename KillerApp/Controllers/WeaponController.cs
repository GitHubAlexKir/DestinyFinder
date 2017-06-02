using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.WeaponRepo;

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
    public void addWeapon([FromBody] dynamic weapon)
    {
      string name = weapon.name;
      int damage = weapon.damage;
      int minlevel = weapon.minlevel;
      int playerID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      weaponRepo.addWeapon(name, damage, minlevel, playerID);
    }
    //wapen verwijderen
    [HttpPost]
    public void deleteWeapon([FromBody] dynamic weapon)
    {
      int ID = weapon.id;
      weaponRepo.deleteWeapon(ID);
    }
    //wapen veranderen
    [HttpPost]
    public void editWeapon([FromBody] dynamic weapon)
    {
      string name = weapon.name;
      int damage = weapon.damage;
      int minlevel = weapon.minlevel;
      int weaponID = weapon.ID;
      weaponRepo.editWeapon(name, damage, minlevel, weaponID);
    }
    //Query wapens boven damage 300 ophalen
    [HttpPost]
    public JsonResult getBest()
    {
      return Json(weaponRepo.getBestWeapons());
    }
    //Query alle wapens ophalen
    [HttpPost]
    public JsonResult getAllWeapons()
    {
      return Json(weaponRepo.getAllWeapons());
    }
    //Query totaal aantal wapens per speler ophalen
    [HttpPost]
    public JsonResult getTotalWeapons()
    {
      return Json(weaponRepo.getTotalWeapons());
    }
    //Query alle wapens ophalen per speler gesorteerd op totaal aantal
    [HttpPost]
    public JsonResult getTotalWeaponsSorted()
    {
      return Json(weaponRepo.getTotalWeaponsSorted());
    }

  }
}