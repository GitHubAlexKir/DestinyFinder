using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerApp.Repositories.BountyRepo
{
    interface IBountyRepo
    {
    void setBounty(int ID, int progress);
    }
}
