using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KillerApp
{
  public class Connection : ConnectionInterface
  {
    public SqlConnection databaseConnection;
    public void Connect()
    {
      databaseConnection = new SqlConnection("Server=127.0.0.1;Database=killerapp;User Id=sa;Password=Wachtwoord2;");
      databaseConnection.Open();
    }
    public void disConnect()
    {
      databaseConnection.Close();
    }

    public SqlConnection getConnection()
    {
      return databaseConnection;
    }
  }
}