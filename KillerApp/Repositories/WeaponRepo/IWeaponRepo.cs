using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.WeaponRepo
{
    interface IWeaponRepo
    {
    void addWeapon(string name, int damage, int minLevel, int userID);
    void deleteWeapon(int ID);
    void editWeapon(string name, int damage, int minlevel, int weaponID);
  }
}
