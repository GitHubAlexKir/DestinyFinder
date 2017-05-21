using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.UserRepo
{
    interface IQuestRepo
    {
    void setQuestRequirement(int ID, int progress);
  }
}
