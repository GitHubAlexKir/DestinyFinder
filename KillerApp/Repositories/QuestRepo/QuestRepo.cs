using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KillerApp.Repositories.QuestRepo
{
    public class QuestRepo : IQuestRepo
    {
        ConnectionInterface connection;

        public QuestRepo()
        {
          this.connection = new Connection();
        }

    public void addQuest(int userID, string description, List<string> requirements)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("INSERT INTO Quest (SpelerID, Omschrijving) VALUES (@ID, @description); SELECT SCOPE_IDENTITY() as int", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", userID);
      sqlCommand.Parameters.AddWithValue("@description", description);
     int id = (int)(decimal)sqlCommand.ExecuteScalar();
      connection.disConnect();
      foreach (string item in requirements)
      {
        connection.Connect();
        sqlCommand = new SqlCommand("INSERT INTO QuestsRequirement (QuestID,voortgang, Omschrijving) VALUES (@ID,'0', @description);", connection.getConnection());
        sqlCommand.Parameters.AddWithValue("@ID", id);
        sqlCommand.Parameters.AddWithValue("@description", item);
        sqlCommand.ExecuteNonQuery();
        connection.disConnect();
      }
    }
    public void setQuestRequirement(int ID, int progress)
    {
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("UPDATE QuestsRequirement SET Voortgang = @progress WHERE ID = @ID;", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@ID", ID);
      sqlCommand.Parameters.AddWithValue("@progress", progress);
      sqlCommand.ExecuteNonQuery();
      connection.disConnect();
    }
  }
}
