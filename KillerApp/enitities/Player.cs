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

    public Player(int ID, int classID, string name, int HP, int level, int XPNextLevel
      ,List<Weapon> weapons)
    {
      this.ID = ID;
      this.classID = classID;
      this.name = name;
      this.HP = HP;
      this.level = level;
      this.XPNextLevel = XPNextLevel;
      this.weapons = weapons;
    }

    public int getID()
    {
      return ID;
    }

    public int getClassID()
    {
      return classID;
    }

    public string getName()
    {
      return name;
    }

    public int getHP()
    {
      return HP;
    }

    public int getLevel()
    {
      return level;
    }

    public int getXPNextLevel()
    {
      return XPNextLevel;
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

    public void setHP(int HP)
    {
      this.HP = HP;
    }

    public void setLevel(int level)
    {
      this.level = level;
    }

    public void setXPNextLevel(int XPNextLevel)
    {
      this.XPNextLevel = XPNextLevel;
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

