using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using System.IO;

// Cercare questi pacchetti su nuget
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;
using System.ComponentModel;

using Newtonsoft.Json;

namespace FormulaOneDll
{
    public class DbTools
    {
        private const string WORKINGPATH = @"C:\Users\Amico Fritz\Desktop\GITHUB\formula-1-anasouammi07\formula-1-anasouammi07\Dati\";
        private const string CONNECTION_STRING = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Amico Fritz\Desktop\GITHUB\formula-1-anasouammi07\formula-1-anasouammi07\Dati\FormulaOne.mdf;Integrated Security=True";

        private Dictionary<int, Driver> drivers;
        private Dictionary<string, Country> countries;
        private Dictionary<int, Circuit> circuits;
        private List<Team> teams;
        public Dictionary<int, Team> teams2;

        public Dictionary<int, Driver> Drivers
        {
            get
            {
                if (this.drivers == null || this.drivers.Count == 0)
                    this.GetDrivers();
                return this.drivers;
            }
            set => drivers = value;
        }
        public Dictionary<string, Country> Countries
        {
            get
            {
                if (this.countries == null)
                    this.GetCountries();
                return this.countries;
            }
            set => countries = value;
        }
        public List<Team> Teams
        {
            get
            {
                if (teams == null || teams.Count == 0)
                   this.teams = this.LoadTeams();
                return teams;
            }
            set => teams = value;
        }

       

        public void ExecuteSqlScript(string sqlScriptPath)
        {
            var fileContent = File.ReadAllText($"{WORKINGPATH}{sqlScriptPath}");
            fileContent = fileContent
                .Replace("\r\n", "")
                .Replace("\r", "")
                .Replace("\n", "")
                .Replace("\t", "");
            var sqlQueries = fileContent.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries);

            var con = new SqlConnection($@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename={WORKINGPATH}FormulaOne.mdf;Integrated Security=True");
            var cmd = new SqlCommand("query", con);
            con.Open();
            foreach (var query in sqlQueries)
            {
                cmd.CommandText = query;
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"Errore in esecuzione della query numero: {ex.LineNumber}");
                    Console.WriteLine($"Errore: {ex.Number} {ex.Message}");
                }
            }
            con.Close();
            con.Dispose();
            SqlConnection.ClearAllPools();
        }

        

        public Dictionary<string, Country> GetCountries()
        {
            if (this.countries == null)
            {
                this.countries = new Dictionary<string, Country>();
                var con = new SqlConnection(CONNECTION_STRING);
                using (con)
                {
                    con.Open();
                    var command = new SqlCommand("SELECT * FROM Countries;", con);
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        string countryIsoCode = reader.GetString(0);
                        Country c = new Country()
                        {
                            CountryCode = countryIsoCode,
                            CountryName = reader.GetString(1)
                        };
                        this.countries.Add(countryIsoCode, c);
                    }
                    con.Close();
                    con.Dispose();
                }
                SqlConnection.ClearAllPools();
            }
            return this.countries;
        }
          /* public void GetTeams(bool forceReload = false)
        {
            if (forceReload || this.Teams == null)
            {
                this.teams2 = new Dictionary<int, Team>();
                GetCountries();
                GetDrivers();
                var con = new SqlConnection(CONNECTION_STRING);
                using (con)
                {
                    SqlCommand command = new SqlCommand(
                      "SELECT * FROM Teams;",
                      con);
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        Team t = new Team(
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            Countries[reader.GetString(3)],
                            reader.GetString(4),
                            reader.GetString(5),
                            reader.GetString(6),
                            Drivers[reader.GetInt32(7)],
                            Drivers[reader.GetInt32(8)]
                        );
                        this.teams2.Add(t.ID, t);
                    }
                    reader.Close();
                }
            }
        }*/

        public Dictionary<int, Circuit> GetCircuits(bool forceReload = false)
        {
            if (forceReload || circuits == null)
            {
                circuits = new Dictionary<int, Circuit>();
                var con = new SqlConnection(CONNECTION_STRING);

                using (con)
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM Circuits", con);
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Circuit c = new Circuit(
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetInt32(2),
                            reader.GetInt32(3),
                            GetCountries()[reader.GetString(4)],
                            reader.GetString(5),
                            reader.GetString(6));
                        circuits.Add(c.Id, c);
                    }
                }
            }
            return circuits;
        }
        public Dictionary<int, Driver> GetDrivers(bool forceReload = false)
        {
            if (forceReload || drivers == null)
            {
                drivers = new Dictionary<int, Driver>();
                var con = new SqlConnection(CONNECTION_STRING);

                using (con)
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM Drivers", con);
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Driver d = new Driver(
                            reader.GetInt32(0),
                            reader.GetString(1),
                            reader.GetString(2),
                            reader.GetDateTime(3),
                            reader.GetString(4),
                            GetCountries()[reader.GetString(5)],
                            reader.GetString(6),
                            reader.GetString(7)
                        );
                        drivers.Add(d.Id, d);
                    }
                }
            }
            return drivers;
        }

        public List<Team> LoadTeams()
        {
           List<Team> retVal = new List<Team>();

            var con = new SqlConnection(CONNECTION_STRING);

            using (con)
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Teams;", con);
                con.Open();

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string teamCountryCode = reader.GetString(3);
                    // Country teamCountry = GetCountries().Find(item => item.CountryCode == teamCountryCode);
                    Country teamCountry = GetCountries()[teamCountryCode];
                    Driver firstDriver = GetDrivers()[reader.GetInt32(7)];
                    Driver secondDriver = GetDrivers()[reader.GetInt32(8)];

                    Team t = new Team(
                        reader.GetInt32(0),
                        reader.GetString(1),
                        reader.GetString(2),
                        teamCountry,
                        reader.GetString(4),
                        reader.GetString(5),
                        reader.GetString(6),
                        firstDriver,
                        secondDriver,
                        reader.GetString(9),
                        reader.GetString(10)
                    );
                    retVal.Add(t);
                }
                reader.Close();
            }
            return retVal;
        }
        public bool SerializeToJSON<T>(IEnumerable<T> list, string path)
        {
            try
            {
                string json = JsonConvert.SerializeObject(list, Formatting.Indented);
                new StreamWriter(path, false).Write(json);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
