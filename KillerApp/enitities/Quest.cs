using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
    public class Quest
    {
        public int ID;
        public int mainQuestID;
        public string description;
        public List<QuestRequirement> requirements;

        public Quest(int ID, int mainQuestID, string description, List<QuestRequirement> requirements)
        {
            this.ID = ID;
            this.mainQuestID = mainQuestID;
            this.description = description;
            this.requirements = requirements;
        }
    }
}
