using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.QuestRepo;
using KillerApp.enitities;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class QuestController : Controller
  {
    private IQuestRepo questRepo;

    public QuestController()
    {
      questRepo = new QuestRepo();
    }

    [HttpPost]
    public void setQuestRequirement([FromBody] dynamic quest)
    {
      int ID = quest.ID;
      string progressName = quest.progress;
      int progress;
      if (progressName == "Compleet")
      {
        progress = 0;
      }
      else
      {
        progress = 1;
      }
      questRepo.setQuestRequirement(ID, progress);
    }
    [HttpPost]
    public void addQuest([FromBody] Quest quest)
    {
      int userID = quest.ID;
      string description = quest.description;
      List<string> requirements = new List<string>();
      foreach (var item in quest.requirements)
      {
        requirements.Add(item.description);
      }
      questRepo.addQuest(userID, description, requirements);
    }
    [HttpPost]
    public JsonResult getMain()
    {
      return Json(questRepo.getMainQuest());
    }
  }
}