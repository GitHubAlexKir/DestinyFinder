using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.enitities
{
  /// <summary>
  /// Quest entititeit met de attributen
  /// </summary>
  public class Quest
  {
    public int ID;
    public int mainQuestID;
    public string description;
    public List<QuestRequirement> requirements;
    public string progress;

    public Quest(int ID, int mainQuestID, string description, List<QuestRequirement> requirements)
    {
      this.ID = ID;
      this.mainQuestID = mainQuestID;
      this.description = description;
      this.requirements = requirements;
      this.progress = getProgress(requirements);
    }

    private string getProgress(List<QuestRequirement> requirements)
    {
      int total = requirements.Count;
      int completed = 0;
      foreach (QuestRequirement item in requirements)
      {
        if (item.progress == "Compleet")
        {
          completed++;
        }
      }
      return "(" + completed + "/" + total + ")";
    }
  }
}
