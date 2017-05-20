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
          Convert.ToInt32(reader["XPnextlevel"]), getWeapons(ID));
      connection.disConnect();
      return player;
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

    public void UpdatePlayer(Player player)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("update speler set classID = @ClassID where id = @ID", connection.getConnection());

      sqlCommand.Parameters.AddWithValue("@ID", player.getID());
      sqlCommand.Parameters.AddWithValue("@ClassID", player.getClassID());

      sqlCommand.ExecuteNonQuery();
      connection.disConnect();

      connection.Connect();
      sqlCommand = new SqlCommand("update statistiek set HP = @HP, playerlevel = @level, XPNextLevel = @XP where spelerid = @spelerID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@spelerID", player.getID());
      sqlCommand.Parameters.AddWithValue("@HP", player.getHP());
      sqlCommand.Parameters.AddWithValue("@Level", player.getLevel());
      sqlCommand.Parameters.AddWithValue("@XP", player.getXPNextLevel());
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }
  }
}
