using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.UserRepo;
using KillerApp.enitities;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class PlayerController : Controller
  {
    private IPlayerRepo playerRepo;
    private IQuestRepo questRepo;

    public PlayerController()
    {
      playerRepo = new PlayerRepo();
      questRepo = new QuestRepo();
    }
    //[FromBody] Player player
    [HttpPost]
    public bool register([FromBody] dynamic credentials)
    {
      string name = credentials.name;
      string password = credentials.password;
      string classID = credentials.classID;
      if (playerRepo.register(name,password,classID))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    [HttpPost]
    public JsonResult get([FromBody] dynamic user)
    {
      int ID = user.ID;
      return Json(playerRepo.getPlayer(ID));
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