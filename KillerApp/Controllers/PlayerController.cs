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

    public PlayerController()
    {
      playerRepo = new PlayerRepo();
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
  }
}