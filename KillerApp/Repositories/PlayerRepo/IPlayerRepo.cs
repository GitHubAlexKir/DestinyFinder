using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.UserRepo
{
    interface IPlayerRepo
    {
        bool login(string name, string passwordFilledIn);
        bool register(string name, string pass, string classname);
        Player getPlayer(int ID);
    string getID(string name);
  }
}
