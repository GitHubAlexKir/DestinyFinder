using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.BountyRepo
{
    public class BountyRepo : IBountyRepo
    {
    ConnectionInterface connection;

    public BountyRepo()
    {
      this.connection = new Connection();
    }

    public void setBounty(int ID, int progress)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("UPDATE Bounty SET Voortgang = @progress WHERE ID = @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      sqlCommand.Parameters.AddWithValue("@progress", progress);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

    public void addBounty(string location, string description, int userID)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO Bounty (SpelerID, locatie,omschrijving,voortgang) VALUES (@spelerID, @location, @description, '0');", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@SpelerID", userID);
      sqlCommand.Parameters.AddWithValue("@location", location);
      sqlCommand.Parameters.AddWithValue("@description", description);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }

  }
}
