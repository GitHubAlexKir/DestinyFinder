using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.BountyRepo;
using System.IO;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class BountyController : Controller
  {
    private IBountyRepo bountyRepo;

    public BountyController()
    {
      bountyRepo = new BountyRepo();
    }
    //Bonty on InCompleted/Completed zetten
    [HttpPost]
    public IActionResult setBounty([FromBody] dynamic bounty)
    {
      int ID = bounty.id;
      string progressName = bounty.progress;
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
        bountyRepo.setBounty(ID, progress);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //Bounty toevoegen
    [HttpPost]
    public IActionResult addBounty([FromBody] dynamic bounty)
    {
      try
      {
        int userID = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
        string description = bounty.description;
        string location = bounty.location;

        bountyRepo.addBounty(location, description, userID);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
      }

    }
    //Bounty verwijderen
    [HttpPost]
    public IActionResult deleteBounty([FromBody] dynamic bounty)
    {
      int ID = bounty.id;
      try
      {
        bountyRepo.deleteBounty(ID);
        return StatusCode(200);
      }
      catch (Exception ex)
      {
        logError(ex);
        return StatusCode(500);
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