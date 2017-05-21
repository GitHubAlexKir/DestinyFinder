using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

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
  }
}
