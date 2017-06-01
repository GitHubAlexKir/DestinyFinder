using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  public class Player
  {
    public int ID;
    public int classID;
    public string name;
    public int HP;
    public int level;
    public int XPNextLevel;
    public List<Weapon> weapons;
    public List<Quest> quests;
    public List<Bounty> bounties;
    public string classname;

    public Player(int ID, int classID, string name, int HP, int level, int XPNextLevel
      , List<Weapon> weapons, List<Quest> quests, List<Bounty> bounties)
    {
      this.ID = ID;
      this.classID = classID;
      this.name = name;
      this.HP = HP;
      this.level = level;
      this.XPNextLevel = XPNextLevel;
      this.weapons = weapons;
      this.quests = quests;
      this.bounties = bounties;
      this.classname = getClass();
    }
    public Player(int ID, int classID, string name, int HP, int level, int XPNextLevel)
    {
      this.ID = ID;
      this.classID = classID;
      this.name = name;
      this.HP = HP;
      this.level = level;
      this.XPNextLevel = XPNextLevel;
      this.classname = getClass();
    }



    public void setClass(string className)
    {
      switch (className)
      {
        case "Hunter":
          classID = 1;
          break;
        case "Titan":
          classID = 2;
          break;
        case "Warlock":
          classID = 3;
          break;
      }
    }

    public string getClass()
    {
      switch (classID)
      {
        case 1:
          return "Hunter";
        case 2:
          return "Titan";
        case 3:
          return "Warlock";
        default:
          return null;
      }
    }
  }
}

