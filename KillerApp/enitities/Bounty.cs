using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
    public class Bounty
    {
    public int ID;
    public string location;
    public string description;
    public int progress;

    public Bounty(int ID, string location, string description, int progress)
    {
      this.ID = ID;
      this.location = location;
      this.description = description;
      this.progress = progress;
    }
  }
}
