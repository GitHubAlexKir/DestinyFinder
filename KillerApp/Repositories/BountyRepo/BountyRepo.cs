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

  }
}
