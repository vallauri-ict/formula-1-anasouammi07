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
    $.getJSON('/api/drivers').done(
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
    $.getJSON('/api/teams').done(
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
    $.getJSON('/api/circuits').done(
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
        elem = app.drivers.find(item => item.id == app.idDriver);
        if (elem == undefined)
            app.error = app.stringa.substring(0, app.stringa.length - 1) + ' not found';
        else
            app.rows = [[elem]];
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
        elem = app.teams.find(item => item.id == app.idTeam);
        if (elem == undefined)
            app.error = app.stringa.substring(0, app.stringa.length - 1) + ' not found';
        else
            app.rows = [[elem]];
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
        elem = app.circuits.find(item => item.id == app.idCircuit);
        if (elem == undefined)
            app.error = app.stringa.substring(0, app.stringa.length - 1) + ' not found';
        else
            app.rows = [[elem]];
    }
}


function clear() {
    app.error = '';
    app.idDriver = '';
    app.idTeam = '';
    app.idCircuit= '';
}
