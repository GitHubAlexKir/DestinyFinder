using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  /// <summary>
  /// bounty entititeit met de attributen
  /// </summary>
  public class Bounty
  {
    public int ID;
    public string location;
    public string description;
    public string progress;

    public Bounty(int ID, string location, string description, int progress)
    {
      this.ID = ID;
      this.location = location;
      this.description = description;
      if (progress == 1)
      {
        this.progress = "Compleet";
      }
      else
      {
        this.progress = "Incompleet";
      }
    }
  }
}
