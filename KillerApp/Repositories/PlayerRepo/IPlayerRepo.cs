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
    Player updatePlayer(int iD, int classID, int hP, int level, int xP);
    bool Fight(int challenger, int opponent, int weaponID);
    string getRewards(int challenger);
    List<Player> getPlayers(int ID);
  }
}
