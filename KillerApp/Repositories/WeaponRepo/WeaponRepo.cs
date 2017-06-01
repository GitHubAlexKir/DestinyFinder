using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using KillerApp.enitities;

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
  }
}
