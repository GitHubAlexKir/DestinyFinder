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

    public List<Quest> getMainQuest()
    {
      List<Quest> quests = new List<Quest>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * FROM Quest WHERE MainQuestID = (SELECT top 1 ID FROM Quest WHERE Omschrijving = 'Fruit of the Garden');", connection.getConnection());
      SqlDataReader reader = sqlCommand.ExecuteReader();
      if (reader.HasRows)
      {
        while (reader.Read())
        {
          int questID = Convert.ToInt16(reader["ID"]);
          int mainquestID = Convert.ToInt32(reader["mainQuestID"]);
          string omschrijving = reader["omschrijving"].ToString();
          List<QuestRequirement> questsreq = new List<QuestRequirement>();
          quests.Add(new Quest(questID, mainquestID, omschrijving, questsreq));
        }
      }
      connection.disConnect();
      return quests;
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
