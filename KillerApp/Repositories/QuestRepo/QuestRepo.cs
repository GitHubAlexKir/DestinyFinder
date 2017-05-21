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
    public class QuestRepo : IQuestRepo
    {
        ConnectionInterface connection;

        public QuestRepo()
        {
          this.connection = new Connection();
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
