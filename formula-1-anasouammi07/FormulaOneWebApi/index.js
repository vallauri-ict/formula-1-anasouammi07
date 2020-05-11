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
            error: '',
            idDriver: '',
            idTeam: '',
            idCircuit:''

        },
        methods: {
            driversClick: getDrivers,
            teamsClick: getTeams,
            circuitsClick: getCircuits,
            findDriver: findDriver,
            findTeam: findTeam,
            findCircuit: findCircuit
        }
    });
});

function getDrivers() {
    clear();
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

function findDriver() {
    let elem;
    app.error = '';

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
    app.error = '';

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
    app.idCircuit= '';
}
