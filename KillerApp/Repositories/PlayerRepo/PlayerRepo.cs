using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KillerApp.Repositories.UserRepo
{
    public class PlayerRepo : IPlayerRepo
    {
        ConnectionInterface connection;

        public PlayerRepo()
        {
          this.connection = new Connection();
        }
    public bool login(string name, string passwordFilledIn)
        {
       bool login = false;
       string passwordDatabase = "";
      
       if (name == null || name == "" || passwordFilledIn == null || passwordFilledIn == "") return false;
           connection.Connect();
           SqlCommand sqlCommand = new SqlCommand("SELECT * from Speler where naam like @naam", connection.getConnection());
      
           sqlCommand.Parameters.AddWithValue("@naam", name);
      
           SqlDataReader reader = sqlCommand.ExecuteReader();
           if (reader.HasRows)
           {
               while (reader.Read())
               {
                 passwordDatabase = reader["wachtwoord"].ToString();
               }
           }
            connection.disConnect();
       if (passwordDatabase == passwordFilledIn)
       {
           login = true;
       }
      
       return login;
        }
    public bool register(string name, string pass, string classname)
    {
      if (nameCheck(name))
      {
        int classID = 1;
        switch (classname)
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
        connection.Connect();
        SqlCommand command = new SqlCommand("createPlayer", connection.getConnection());
        command.CommandType = CommandType.StoredProcedure;
          command.Parameters.Add(new SqlParameter("@class", classID));
          command.Parameters.Add(new SqlParameter("@naam", name));
          command.Parameters.Add(new SqlParameter("@wachtwoord", pass));
          command.ExecuteNonQuery();
        connection.disConnect();
        return true;
      }
      else
      {
        return false;
      }
        
    }

    private bool nameCheck(string name)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT COUNT(*) from speler where naam like @name", connection.getConnection());
        sqlCommand.Parameters.AddWithValue("@name", name);
        int userCount = (int)sqlCommand.ExecuteScalar();
      connection.disConnect();
      if (userCount == 0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    public string getID(string name)
    {
      string ID;
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from speler where naam like @name", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@name", name);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      reader.Read();
      ID = reader["ID"].ToString();
      connection.disConnect();
      return ID;
    }
    public Player getPlayer(int ID)
    {
      Player player;
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from speler spel join Statistiek stat on stat.spelerID = spel.ID where spel.ID = @ID", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      reader.Read();
      player = new Player(Convert.ToInt32(reader["ID"]),
          Convert.ToInt32(reader["classID"]), reader["naam"].ToString(),
          Convert.ToInt32(reader["HP"]), Convert.ToInt32(reader["playerlevel"]),
          Convert.ToInt32(reader["XPnextlevel"]), getWeapons(ID),getQuests(ID),getBounties(ID));
      connection.disConnect();
      return player;
    }
    public List<Player> getPlayers(int ID)
    {
      List<Player> players = new List<Player>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from speler spel join Statistiek stat on stat.spelerID = spel.ID where spel.ID != @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          players.Add(
            new Player(Convert.ToInt32(reader["ID"]),
          Convert.ToInt32(reader["classID"]), reader["naam"].ToString(),
          Convert.ToInt32(reader["HP"]), Convert.ToInt32(reader["playerlevel"]),
          Convert.ToInt32(reader["XPnextlevel"])));
        }
      }
      connection.disConnect();
      return players;
    }
    private List<Weapon> getWeapons(int ID)
    {
      List<Weapon> weapons = new List<Weapon>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select w.id, w.naam, w.damage,w.minLevel from Wapen w join Speler s on s.ID = w.SpelerID where s.ID = @ID", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          weapons.Add(new Weapon(Convert.ToInt16(reader["ID"]), reader["naam"].ToString(), Convert.ToInt16(reader["damage"]), Convert.ToInt16(reader["minLevel"])));
        }
      }
      connection.disConnect();
      return weapons;
    }
    private List<Quest> getQuests(int ID)
    {
      List<Quest> quests = new List<Quest>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select q.id, q.MainQuestID, q.Omschrijving from Quest q join Speler s on s.ID = q.SpelerID where s.ID = @ID;", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          int questID = Convert.ToInt16(reader["ID"]);
          int mainquestID;
          if (reader["mainQuestID"].Equals(DBNull.Value))
          {
            mainquestID = 0;
          }
          else
          {
            mainquestID = Convert.ToInt16(reader["mainQuestID"]);
          }
          string omschrijving = reader["omschrijving"].ToString();
          List<QuestRequirement> questsreq = getQuestRequirements(questID);
          quests.Add(new Quest(questID,mainquestID,omschrijving,questsreq));
        }
      }
      connection.disConnect();
      return quests;
    }

    private List<QuestRequirement> getQuestRequirements(int ID)
    {
      List<QuestRequirement> requirements = new List<QuestRequirement>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from QuestsRequirement where QuestID= @ID;", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          requirements.Add(new QuestRequirement(Convert.ToInt16(reader["ID"]), Convert.ToInt16(reader["voortgang"]), reader["omschrijving"].ToString()));
        }
      }
      connection.disConnect();
      return requirements;
    }
    private List<Bounty> getBounties(int ID)
    {
      List<Bounty> bounties = new List<Bounty>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from Bounty where SpelerID= @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          int bountyID = Convert.ToInt16(reader["ID"]);
          string location;
          if (reader["locatie"].Equals(DBNull.Value))
          {
            location = "Everywhere";
          }
          else
          {
            location = reader["locatie"].ToString();
          }
          string omschrijving = reader["omschrijving"].ToString();
          int progress = Convert.ToInt16(reader["voortgang"]);
          bounties.Add(new Bounty(bountyID, location, omschrijving, progress));
        }
      }
      connection.disConnect();
      return bounties;
    }

    public void UpdatePlayer(Player player)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("update speler set classID = @ClassID where id = @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", player.ID);
      sqlCommand.Parameters.AddWithValue("@ClassID", player.classID);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
      connection.Connect();
      sqlCommand = new SqlCommand("update statistiek set HP = @HP, playerlevel = @level, XPNextLevel = @XP where spelerid = @spelerID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@spelerID", player.ID);
      sqlCommand.Parameters.AddWithValue("@HP", player.HP);
      sqlCommand.Parameters.AddWithValue("@Level", player.level);
      sqlCommand.Parameters.AddWithValue("@XP", player.XPNextLevel);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public Player updatePlayer(int iD, int classID, int HP, int level, int XP)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("update speler set classID = @ClassID where id = @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", iD);
      sqlCommand.Parameters.AddWithValue("@ClassID", classID);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
      connection.Connect();
      sqlCommand = new SqlCommand("update statistiek set HP = @HP, playerlevel = @level, XPNextLevel = @XP where spelerid = @spelerID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@spelerID", iD);
      sqlCommand.Parameters.AddWithValue("@HP", HP);
      sqlCommand.Parameters.AddWithValue("@Level", level);
      sqlCommand.Parameters.AddWithValue("@XP", XP);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
      return getPlayer(iD);
    }

    public bool Fight(int challengerHP, int opponentID, int weaponID)
    {
      int opponentHP;
      int opponentDamage;
      int challengerDamage;

      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select TOP 1 stat.HP,wap.damage from speler spel join Statistiek stat on stat.spelerID = spel.ID join wapen wap on wap.spelerID = spel.ID where spel.ID = @ID and wap.damage = (select max(damage) from wapen where spelerID = @ID)", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", opponentID);
      SqlDataReader reader = sqlCommand.ExecuteReader();
      reader.Read();
      opponentHP = Convert.ToInt32(reader["HP"]);
      opponentDamage = Convert.ToInt32(reader["Damage"]);
      connection.disConnect();

      connection.Connect();
      sqlCommand = new SqlCommand("select damage from Wapen where ID = @ID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", weaponID);
      reader = sqlCommand.ExecuteReader();
      reader.Read();
      challengerDamage = Convert.ToInt32(reader["damage"]);
      connection.disConnect();

      int opponentHits = 0;
      while (challengerHP > 0)
      {
        challengerHP -= opponentDamage;
        opponentHits++;
      }

      int challengerHits = 0;
      while (opponentHP > 0)
      {
        opponentHP -= challengerDamage;
        challengerHits++;
      }
      if (challengerHits >= opponentHits)
      {
        return false;
      }
      else
      {
        return true;
      }
      
    }

    public string getRewards(int challenger)
    {
      Player player = getPlayer(challenger);
      Random random = new Random();
      int XP = 100 * random.Next(1, 10);
      if (player.XPNextLevel <= XP)
      {
        player.level++;
        player.XPNextLevel = player.level * 150;
        player.HP += 200;
        updatePlayer(player.ID,player.classID,player.HP,player.level,player.XPNextLevel);
        return XP.ToString() + "XP gekregen en u bent level " + player.level + " geworden, er is een wapen toegevoegd in je inventaris.";
      }
      else
      {
        player.XPNextLevel -= XP;
        updatePlayer(player.ID, player.classID, player.HP, player.level, player.XPNextLevel);
        return XP.ToString() + "XP gekregen.";
      }
    }
  }
}
