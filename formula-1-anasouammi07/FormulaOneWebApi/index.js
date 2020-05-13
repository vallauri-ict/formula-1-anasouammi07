let app;

$(function () {
    app = new Vue({
        el: "#div",
        data: {
            drivers: [],
            teams: [],
            circuits: [],
            rows: [],
            stringa: '',
            idRicerca: '',
            driver: null,
            team:null,
            error: '',
            idDriver: '',
            idTeam: '',
            idCircuit: '',
            showArrow: true,
            viewDetails: false  //variabile che ti serve per visualizzare o meno i dettagli
   
        },
        methods: {
            driversClick: getDrivers,
            teamsClick: getTeams,
            circuitsClick: getCircuits,
            findDriver: findDriver,
            findTeam: findTeam,
            findCircuit: findCircuit,
            imgClick: imgClick,
            viewDetailsDriver: function (driver) {
                //console.log(driver);
                $.getJSON('/api/drivers/' + driver.id + '/details').done((data)=> {
                    console.log(data);
                    this.driver = data;
                    this.viewDetails = true;
                })
              },
            viewDetailsTeam: function (team) {
                //console.log(team);
                $.getJSON('/api/teams/' + team.id + '/details').done((data) => {
                    console.log(data);
                    this.team = data;
                    this.viewDetails = true;
                })
            },

        }
    });
});

function getDrivers() {
    clear();
    app.viewDetails = false;
    app.stringa = 'drivers';
    $.getJSON('/api/drivers/list').done(
        function (data) {
            console.log(data);
            app.drivers = data;
            app.rows = [];
            for (let i = 0; i < app.drivers.length; i += 4) {
                app.rows[i / 4] = app.drivers.slice(i, i + 4);
            }
        });
}

function getTeams() {
    clear();
    app.viewDetails = false;
    app.stringa = 'teams';
    $.getJSON('/api/teams/list').done(
        function (data) {
            console.log(data);
            app.teams = data;
            app.rows = [];
            for (let i = 0; i < app.teams.length; i += 4) {
                app.rows[i / 4] = app.teams.slice(i, i + 4);
            }
        });
}
function getCircuits() {
    clear();
    app.viewDetails = false;
    app.stringa = 'circuits';
    $.getJSON('/api/circuits/list').done(
        function (data) {
            console.log(data);
            app.circuits = data;
            app.rows = [];
            for (let i = 0; i < app.circuits.length; i += 3) {
                app.rows[i / 3] = app.circuits.slice(i, i + 3);
            }
        });
}

function imgClick() {
    window.location.reload();
}

function findDriver() {
    let elem;
    app.error = '';
    app.viewDetails = false;
    app.stringa = "drivers";
    if (app.idDriver == '') {
        for (let i = 0; i < app.drivers.length; i += 4) {
            app.rows[i / 4] = app.drivers.slice(i, i + 4);
        }
    } else {
        $.getJSON('/api/drivers/' + app.idDriver + "/details").done( //richiesta dei dettagli del driver richiesto
            function (data) {
                console.log(data);
                app.rows = [[data]];
            }).fail(function (data)
            {
                if (data.status == 404)
                    app.error = 'Pilota non trovato' //
            });
        
    }
}
function findTeam() {
    let elem;
    app.error = '';
    app.stringa = "teams";
    app.viewDetails = false;
    if (app.idTeam == '') {
        for (let i = 0; i < app.teams.length; i += 4) {
            app.rows[i / 4] = app.teams.slice(i, i + 4);
        }
    } else {
        $.getJSON('/api/teams/' + app.idTeam + "/details").done( //richiesta dei dettagli del team richiesto
            function (data) {
                console.log(data);
                app.rows = [[data]];
            }).fail(function (data) {
                if (data.status == 404)
                    app.error = 'Team non trovato' //
            });
    }
}
function findCircuit() {
    let elem;
    app.viewDetails = false;
    app.error = '';
    app.stringa = "circuits";
    if (app.idCircuit == '') {
        for (let i = 0; i < app.circuits.length; i += 4) {
            app.rows[i / 4] = app.circuits.slice(i, i + 4);
        }
    } else {
        $.getJSON('/api/circuits/' + app.idCircuit + "/details").done( //richiesta dei dettagli del cirucito richiesto
            function (data) {
                console.log(data);
                app.rows = [[data]];
            }).fail(function (data) {
                if (data.status == 404)
                    app.error = 'circuito non trovato' //
            });;
    }
}


function clear() {
    app.rows = [];
    app.error = '';
    app.idDriver = '';
    app.idTeam = '';
    app.idCircuit = '';
    app.showArrow = false;
}
