using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.WeaponRepo
{
  public interface IWeaponRepo
  {
    void addWeapon(string name, int damage, int minLevel, int userID);
    void deleteWeapon(int ID);
    void editWeapon(string name, int damage, int minlevel, int weaponID);
    List<Weapon> getBestWeapons();
    List<WeaponUser> getAllWeapons();
    List<WeaponUser> getTotalWeapons();
    List<WeaponUser> getTotalWeaponsSorted();
    void random(int playerID, int playerlevel);
  }
}
