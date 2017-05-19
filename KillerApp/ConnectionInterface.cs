using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KillerApp
{
  public interface ConnectionInterface
  {
    void Connect();
    void disConnect();
    SqlConnection getConnection();
  }
}