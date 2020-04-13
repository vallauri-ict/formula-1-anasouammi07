using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace FormulaOneDll
{
    [DataContract(Name="driver")]
    public class Driver
    {
        #region Attributes
        [DataMember(Name ="id")]
        private readonly int id;
        [DataMember(Name = "firstname")]
        private string firstname;
        [DataMember(Name = "lastname")]
        private string lastname;
        [DataMember(Name = "dob")]
        private DateTime dob;
        [DataMember(Name = "placeOfBirthday")]
        private string placeOfBirthday;
        [DataMember(Name = "country")]
        private Country country;
        #endregion

        #region Constructors
        public Driver(int id) { this.id = id; }

        public Driver(int id, string firstname, string lastname, DateTime dob, string placeOfBirthday, Country country) : this (id)
        {
            this.Firstname = firstname;
            this.Lastname = lastname;
            this.Dob = dob;
            this.PlaceOfBirthday = placeOfBirthday;
            this.Country = country;
        }
        #endregion

        #region Properties
        
        public int ID { get => id; }

        public string Firstname { get => firstname; set => firstname = value; }

        public string Lastname { get => lastname; set => lastname = value; }

        public DateTime Dob { get => dob; set => dob = value; }

        public string PlaceOfBirthday { get => placeOfBirthday; set => placeOfBirthday = value; }

        public Country Country { get => country; set => country = value; }
        #endregion

        #region Methods
        public override string ToString() => $"{this.Firstname} {this.lastname}";
        #endregion
    }
}
