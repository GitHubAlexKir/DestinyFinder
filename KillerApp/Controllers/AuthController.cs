using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using KillerApp;
using KillerApp.Repositories.UserRepo;
using Newtonsoft.Json;

namespace KillerApp.Controllers
{
  [Route("api/[controller]/[action]")]
  public class AuthController : Controller
  {

    IPlayerRepo playerRepo;

    public AuthController()
    {
      this.playerRepo = new PlayerRepo();
    }

    //Login: Controleert of inloggegevens corect zijn en maakt een Accesstoken
    [HttpPost]
    public AccessToken Login([FromBody] dynamic credentials)
    {
      string name = credentials.name;
      string password = credentials.password;

      if (!playerRepo.login(name, password)) throw new UnauthorizedAccessException();

      return CreateAccessToken(playerRepo.getID(name));
    }


    private static AccessToken CreateAccessToken(string userId)
    {
      var claims = new List<Claim>();
      claims.Add(new Claim("userid", userId));

      var signing = new SigningCredentials(new SymmetricSecurityKey(new byte[32]), SecurityAlgorithms.HmacSha256);

      var jwt = new JwtSecurityToken(
        issuer: "theIssuer",
        audience: "theAudience",
        claims: claims,
        notBefore: DateTime.UtcNow,
        expires: DateTime.UtcNow + TimeSpan.FromHours(24),
        signingCredentials: signing);


      string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
      return new AccessToken { access_token = encodedJwt };
    }
  }

  public class AccessToken
  {
    public string access_token { get; set; }
  }
}
