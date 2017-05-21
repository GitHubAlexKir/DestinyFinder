using KillerApp.enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.QuestRepo
{
    interface IQuestRepo
    {
    void setQuestRequirement(int ID, int progress);
  }
}
