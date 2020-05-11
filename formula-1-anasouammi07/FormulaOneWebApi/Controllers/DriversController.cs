using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Web.Http;
using System.Web.Services;
using FormulaOneDll;

namespace FormulaOneWebApi.Controllers
{
    [RoutePrefix("api/drivers")]// indica a quale api rispondere
    public class DriversController : ApiController
    {
        DbTools db = new DbTools();
       
        [Route("list")]
        public IEnumerable<Driver> GetAllDrivers()
        {
            //db.GetDrivers();
            return db.Drivers.Values;
        }

        [Route("{id:int}/details")]
        public IHttpActionResult GetDriver(int id)
        {
            db.GetDrivers();
            if (db.Drivers[id] == null)
                return NotFound();

            return Ok(db.Drivers[id]);
        }
    }
}
