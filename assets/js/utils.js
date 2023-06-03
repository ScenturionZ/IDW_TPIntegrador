const GLOBAL_KEYS = {
                        ESTUDIANTES : "estudiantes",
                        CARRERAS : "carreras",
                        MATERIAS : "materias"
                    }
const GLOBAL_VALUES = {
                        ESTUDIANTES_JSON: "./assets/json/estudiantes.json",
                        CARRERAS_JSON: "./assets/json/carreras.json"
                    }

function readJSON(file, callback){
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getJSON(key){
    return JSON.parse(localStorage.getItem(key));
}

function setJSON(key, array){
    array.sort(function(a, b) { 
        return a.id - b.id;
    });
    localStorage.setItem(key, JSON.stringify(array));
}

function removeItem(key, id){
    let array = getJSON(key);
    let element = array.find(item => item.id == id);
    let index = array.indexOf(element);
    if(element != undefined && index > -1){
        array.splice(index, 1);
        setJSON(key, array);
    }
}

function addItem(key, element){
    let array = getJSON(key);
    array.push(element);
    setJSON(key, array);
}

function generateId(key){
    let array = getJSON(key);
    array.sort(function(a, b) { 
        return a.id - b.id;
    });
    return Number(array[array.length - 1].id) + 1;
}

function getTable(key){
    let tableName = "tabla" + key.charAt(0).toUpperCase() + key.slice(1);
    return document.getElementById(tableName);
}

function appendElementTable(key, element){
    let table = getTable(key);
    let tableBody = table.getElementsByTagName('tbody')[0];
    let keys = Object.keys(element);
    let row = tableBody.insertRow(-1);
    let checkButton =   '<input type="checkbox" class="checkDelete" id="' + element.id + '">' + 
                        '<label for="' + element.id + '"></label>';
    let cell = row.insertCell(-1);
    let actionsButton = '<a class="btn edit" type="button" id="edit-' + element.id + '">Editar</a>' + 
                        '<a class="btn delete" type="button" id="delete-' + element.id + '">Eliminar</a>';
    cell.classList.add('checkbox-group');
    cell.innerHTML = checkButton;
    for(let i = 0; i < keys.length; i++){
        let k = keys[i];
        cell = row.insertCell(-1);
        if(k == "id" && element[k] < 10)
            cell.innerHTML = "0" + element[k];
        else{
            cell.innerHTML = element[k];
        }
    }
    if(key == GLOBAL_KEYS.CARRERAS){
        let materiasButton = '<a class="btn materias-btn" type="button" id="materias-' + element.id + '">Ver listado</a>'
        cell = row.insertCell(-1);
        cell.classList.add('td-btn');
        cell.innerHTML = materiasButton;
    }
    cell = row.insertCell(-1);
    cell.classList.add('td-btn');
    cell.innerHTML = actionsButton;
}

window.addEventListener("load", function(){
    let deleteButtons = document.getElementsByClassName('delete');
    for (let btnDelete of deleteButtons) {
        btnDelete.onclick = function() {
            let actionsButton = this.parentElement;
            let row = actionsButton.parentElement;
            let tbody = row.parentElement;
            let table = tbody.parentElement;
            let key = table.id.replace("tabla", "").toLowerCase();
            let id = btnDelete.id.replace("delete-", "");
            table.deleteRow(row.rowIndex);
            removeItem(key, id);
        }
    }
});