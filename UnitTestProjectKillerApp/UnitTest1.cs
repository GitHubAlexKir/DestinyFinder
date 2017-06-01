using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using KillerApp;
using KillerApp.Repositories.UserRepo;
using System.Linq;
using KillerApp.enitities;

namespace UnitTestProjectKillerApp
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethodRegister()
        {
            IPlayerRepo playerRepo = new PlayerRepo();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] stringChars = new char[12];
            Random random = new Random();
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            string finalString = new String(stringChars);
            finalString += "@email.com";
            playerRepo.register(finalString, "Wachtwoord2", "Hunter");
            bool registerSame = playerRepo.register(finalString, "Wachtwoord2", "Hunter");
            Assert.AreEqual(registerSame, false);
        }
        [TestMethod]
        public void TestMethodLogin()
        {
            IPlayerRepo playerRepo = new PlayerRepo();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] stringChars = new char[12];
            Random random = new Random();
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            string finalString = new String(stringChars);
            finalString += "@email.com";
            playerRepo.register(finalString, "Wachtwoord2", "Hunter");
            bool registerSame = playerRepo.login(finalString, "Wachtwoord2");
            Assert.AreEqual(registerSame, true);
        }
        [TestMethod]
        public void TestMethodUpdateNonExistingPlayer()
        {
            IPlayerRepo playerRepo = new PlayerRepo();
            bool error = false;
            try
            {
                playerRepo.updatePlayer(999999999, 1, 1, 2, 1);
            }
            catch (Exception)
            {
                error = true;
            }
            Assert.AreEqual(error, true);
        }

        [TestMethod]
        public void TestMethodFightLost()
        {
            IPlayerRepo playerRepo = new PlayerRepo();
            bool win = playerRepo.Fight(1, 1, 1);
            Assert.AreEqual(win, false);
        }

        [TestMethod]
        public void TestMethodFightWin()
        {
            IPlayerRepo playerRepo = new PlayerRepo();
            bool win = playerRepo.Fight(999999, 1, 1);
            Assert.AreEqual(win, true);
        }

    }
}

