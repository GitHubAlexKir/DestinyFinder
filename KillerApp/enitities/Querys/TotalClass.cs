using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  /// <summary>
  /// Voor het ophalen van aantal gebruikers per class
  /// </summary>
  public class TotalClass
  {
    public string name;
    public int total;

    public TotalClass(string name, int total)
    {
      this.name = name;
      this.total = total;
    }

  }
}
