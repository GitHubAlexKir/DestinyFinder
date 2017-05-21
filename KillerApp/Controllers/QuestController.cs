using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.QuestRepo;

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
  }
}