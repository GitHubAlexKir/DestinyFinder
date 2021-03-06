using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using KillerApp;
using KillerApp.Repositories.UserRepo;
using System.Linq;
using KillerApp.enitities;
using KillerApp.Repositories.BountyRepo;
using KillerApp.Repositories.WeaponRepo;

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
            playerRepo.register(finalString, "Wachtwoord2", "Hunter");
            bool login = playerRepo.login(finalString, "Wachtwoord2");
            Assert.AreEqual(login, true);
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

        [TestMethod]
        public void TestMethodBounty()
        {
            bool addPassed = false;
            bool deletePassed = true;
            int bountyID = 0;
            IBountyRepo bountyRepo = new BountyRepo();
            string testBounty = "1234567891QWERTYZXCVBNMKGLDOWN";
            bountyRepo.addBounty(testBounty, testBounty, 1);
            IPlayerRepo playerRepo = new PlayerRepo();
            Player player = playerRepo.getPlayer(1);
            foreach (Bounty item in player.bounties)
            {
                if (item.description == testBounty)
                {
                    addPassed = true;
                    bountyID = item.ID;
                }
            }
            bountyRepo.deleteBounty(bountyID);
            player = playerRepo.getPlayer(1);
            foreach (Bounty item in player.bounties)
            {
                if (item.description == testBounty)
                {
                    deletePassed = false;
                }
            }
            bool passed = false;
            if (addPassed && deletePassed)
            {
                passed = true;
            }
            Assert.AreEqual(passed, true);
        }

        [TestMethod]
        public void TestMethodWeapon()
        {
            bool addPassed = false;
            bool deletePassed = true;
            int weaponID = 0;
            IWeaponRepo weaponRepo = new WeaponRepo();
            string testWeapon = "1234567891QWERTYZXCVBNMKGLDOWN";
            weaponRepo.addWeapon(testWeapon, 100, 1, 1);
            IPlayerRepo playerRepo = new PlayerRepo();
            Player player = playerRepo.getPlayer(1);
            foreach (Weapon item in player.weapons)
            {
                if (item.name == testWeapon)
                {
                    addPassed = true;
                    weaponID = item.ID;
                }
            }
            weaponRepo.deleteWeapon(weaponID);
            player = playerRepo.getPlayer(1);
            foreach (Weapon item in player.weapons)
            {
                if (item.name == testWeapon)
                {
                    deletePassed = false;
                }
            }
            bool passed = false;
            if (addPassed && deletePassed)
            {
                passed = true;
            }
            Assert.AreEqual(passed, true);
        }

    }
}

