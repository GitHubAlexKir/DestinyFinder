using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using KillerApp.enitities;
using System.Data;

namespace KillerApp.Repositories.WeaponRepo
{
  public class WeaponRepo : IWeaponRepo
  {
    ConnectionInterface connection;

    public WeaponRepo()
    {
      this.connection = new Connection();
    }

    public void addWeapon(string name, int damage, int minlevel, int userID)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO wapen (SpelerID, naam, damage, MinLevel) VALUES (@spelerID, @naam, @damage, @minlevel);", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@spelerID", userID);
      sqlCommand.Parameters.AddWithValue("@naam", name);
      sqlCommand.Parameters.AddWithValue("@damage", damage);
      sqlCommand.Parameters.AddWithValue("@minlevel", minlevel);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public void deleteWeapon(int ID)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("DELETE FROM wapen WHERE ID = @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public void editWeapon(string name, int damage, int minlevel, int weaponID)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("UPDATE wapen SET naam = @naam, damage = @damage, minlevel = @minlevel WHERE ID = @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", weaponID);
      sqlCommand.Parameters.AddWithValue("@naam", name);
      sqlCommand.Parameters.AddWithValue("@damage", damage);
      sqlCommand.Parameters.AddWithValue("@minlevel", minlevel);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public List<Weapon> getBestWeapons()
    {
      List<Weapon> weapons = new List<Weapon>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select * from Wapen WHERE Damage >= 300;", connection.getConnection());
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
    public List<WeaponUser> getAllWeapons()
    {
      List<WeaponUser> weapons = new List<WeaponUser>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT Speler.Naam, wapen.Naam as wapen FROM speler INNER JOIN wapen on Wapen.SpelerID = Speler.ID", connection.getConnection());
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          weapons.Add(new WeaponUser(reader["naam"].ToString(), reader["wapen"].ToString()));
        }
      }
      connection.disConnect();
      return weapons;
    }
    public List<WeaponUser> getTotalWeapons()
    {
      List<WeaponUser> weapons = new List<WeaponUser>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select s.naam, (select Count(w.spelerID) from wapen w where w.spelerid = s.id) as wapen from speler s", connection.getConnection());
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          weapons.Add(new WeaponUser(reader["naam"].ToString(), reader["wapen"].ToString()));
        }
      }
      connection.disConnect();
      return weapons;
    }
    public List<WeaponUser> getTotalWeaponsSorted()
    {
      List<WeaponUser> weapons = new List<WeaponUser>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("select s.naam, count(*) as wapen from speler s inner join wapen w on w.SpelerID = s.ID group by s.naam having count(*) > 2 order by count(*) desc", connection.getConnection());
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          weapons.Add(new WeaponUser(reader["naam"].ToString(), reader["wapen"].ToString()));
        }
      }
      connection.disConnect();
      return weapons;
    }

    public void random(int playerID, int playerlevel)
    {
      connection.Connect();
      SqlCommand command = new SqlCommand("randomWeapon", connection.getConnection());
      command.CommandType = CommandType.StoredProcedure;
      command.Parameters.Add(new SqlParameter("@spelerID", playerID));
      command.Parameters.Add(new SqlParameter("@level", playerlevel));
      command.ExecuteNonQuery();
      connection.disConnect();
    }
  }
}
