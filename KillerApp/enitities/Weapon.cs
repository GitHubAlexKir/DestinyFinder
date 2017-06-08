using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  /// <summary>
  /// Weapon entititeit met de attributen
  /// </summary>
  public class Weapon
  {
    public int ID;
    public string name;
    public int damage;
    public int minLevel;

    public Weapon(int ID, string name, int damage, int minLevel)
    {
      this.ID = ID;
      this.name = name;
      this.damage = damage;
      this.minLevel = minLevel;
    }
  }
}
