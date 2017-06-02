using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  public class WeaponUser
  {
    public string name;
    public string weapon;

    public WeaponUser(string name, string weapon)
    {
      this.name = name;
      this.weapon = weapon;
    }
  }
}
