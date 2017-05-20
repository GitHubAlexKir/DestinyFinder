﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
    public class QuestRequirement
    {
       public int ID;
       public bool progress;
       public string description;

       public QuestRequirement(int ID, int progress, string description)
       {
         this.ID = ID;
      if (progress == 1)
      {
        this.progress = true;
      }
      else
      {
        this.progress = false;
      }
         this.description = description;
       }
    }
}
