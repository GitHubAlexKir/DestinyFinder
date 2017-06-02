using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.QuestRepo;
using KillerApp.enitities;
using System.IO;

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
    //QuestRequirement op incompleet/compleet zetten
    [HttpPost]
    public IActionResult setQuestRequirement([FromBody] dynamic quest)
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
      try
      {
        questRepo.setQuestRequirement(ID, progress);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //quest toevoegen
    [HttpPost]
    public IActionResult addQuest([FromBody] Quest quest)
    {
      int userID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
      try
      {
        string description = quest.description;
        List<string> requirements = new List<string>();
        foreach (var item in quest.requirements)
        {
          requirements.Add(item.description);
        }
        questRepo.addQuest(userID, description, requirements);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //Query subquesten van mainquest ophalen
    [HttpPost]
    public JsonResult getMain()
    {
      try
      {
        return Json(questRepo.getMainQuest());
      }
      catch (Exception ex)
      {
        logError(ex);
        return Json(null);
      }

    }

    private void logError(Exception ex)
    {
      string strPath = @"error.txt";
      if (!System.IO.File.Exists(strPath))
      {
        System.IO.File.Create(strPath).Dispose();
      }
      using (StreamWriter sw = System.IO.File.AppendText(strPath))
      {
        sw.WriteLine("=============Error Logging ===========");
        sw.WriteLine("===========Start============= " + DateTime.Now);
        sw.WriteLine("Error Message: " + ex.Message);
        sw.WriteLine("Stack Trace: " + ex.StackTrace);
        sw.WriteLine("===========End============= " + DateTime.Now);
      }
    }
  }
}