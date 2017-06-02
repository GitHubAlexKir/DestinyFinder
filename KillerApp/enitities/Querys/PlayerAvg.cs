using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  public class PlayerAvg
  {
    public string name;
    public int avgDamage;

    public PlayerAvg(string name, int avgDamage)
    {
      this.name = name;
      this.avgDamage = avgDamage;
    }
  }
}
