using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KillerApp.Repositories.BountyRepo;

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

    [HttpPost]
    public void setBounty([FromBody] dynamic bounty)
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
      bountyRepo.setBounty(ID, progress);
    }
  }
}