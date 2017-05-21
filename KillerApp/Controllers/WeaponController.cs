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

    [HttpPost]
    public void addWeapon([FromBody] dynamic weapon)
    {
      string name = weapon.name;
      int damage = weapon.damage;
      int minlevel = weapon.minlevel;
      int playerID = weapon.playerID;
      weaponRepo.addWeapon(name, damage, minlevel, playerID);
    }

    [HttpPost]
    public void deleteWeapon([FromBody] dynamic weapon)
    {
      int ID = weapon.id;
      weaponRepo.deleteWeapon(ID);
    }
  }
}