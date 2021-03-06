﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FormulaOneDll;

namespace FormulaOneWebApi.Controllers
{
    public class CountriesController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<Country> GetAllCountries()
        {
            //db.GetCountries();
            return db.Countries.Values;
        }
        public IHttpActionResult GetCountry(string id)
        {
            //db.GetCountries();
            try
            {
                if(db.Countries[id] == null)
                return NotFound();

                return Ok(db.Countries[id]);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}