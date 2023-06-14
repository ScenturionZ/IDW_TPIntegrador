//GLOBAL VARIABLES
const GLOBAL_KEYS = {
                        ESTUDIANTES : "estudiantes",
                        CARRERAS : "carreras",
                        MATERIAS : "materias"
                    }

const GLOBAL_VALUES = {
                        ESTUDIANTES_JSON: "./assets/json/estudiantes.json",
                        CARRERAS_JSON: "./assets/json/carreras.json",
                        MATERIAS_JSON: "./assets/json/materias.json"
                    }

var globalKey = '';

//MODALS
if(document.getElementById("noChecksModal")){
    var noChecksModal = new bootstrap.Modal(document.getElementById("noChecksModal"), {});
}

if(document.getElementById("deleteMultipleModal")){
    var deleteMultipleModal = new bootstrap.Modal(document.getElementById("deleteMultipleModal"), {});
}

if(document.getElementById("deleteModal")){
    var deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"), {});
}

if(document.getElementById("ElementModal")){
    var elementModal = new bootstrap.Modal(document.getElementById("ElementModal"), {});
}

//BOOSTRAP VALIDATE
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

//FUNCTIONS
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

function getJSON(){
    return JSON.parse(localStorage.getItem(globalKey));
}

function setJSON(array){
    array.sort(function(a, b){ 
        return a.id - b.id;
    });
    localStorage.setItem(globalKey, JSON.stringify(array));
}

function removeItem(id){
    let array = getJSON();
    let element = array.find(item => item.id == id);
    let index = array.indexOf(element);
    if(element != undefined && index > -1){
        array.splice(index, 1);
        setJSON(array);
    }
}

function addItem(element){
    let array = getJSON();
    array.push(element);
    setJSON(array);
}

function updateItem(element){
    let array = getJSON();
    let keys = Object.keys(element);
    for(let i = 0; i < keys.length; i++){
        array.find(item => item.id == element.id)[keys[i]] = element[keys[i]];
    }
    setJSON(array);
}

function generateId(){
    let array = getJSON();
    array.sort(function(a, b) { 
        return a.id - b.id;
    });
    return String(Number(array[array.length - 1].id) + 1);
}

function toCapitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getTable(){
    let tableName = "tabla" + toCapitalize(globalKey);
    return document.getElementById(tableName);
}

function loadFilters(){
    let html = '';
    let filters = document.getElementsByClassName("filter");
    for (let f of filters) {
        html += '<div class="form-check form-switch">' +
                    '<input class="form-check-input check-filter" type="checkbox" role="switch" id="f-' + f.innerHTML + '" checked>' +
                    '<label class="form-check-label" for="f-' + f.innerHTML + '">' + f.innerHTML + '</label>' +
                '</div>';
    }
    document.getElementById("dropdown-menu-filter").innerHTML = html;
}

function appendElementTable(element){
    let table = getTable();
    let tableBody = table.getElementsByTagName('tbody')[0];
    let keys = Object.keys(element);
    let row = tableBody.insertRow(-1);
    let checkButton =   '<input type="checkbox" class="checkDelete" id="' + element.id + '">' + 
                        '<label for="' + element.id + '"></label>';
    let cell = row.insertCell(-1);
    let actionsButton = '<button type="button" class="btn edit btn-outline-secondary rounded-pill me-2" id="edit-' + element.id + '">Editar</button>' + 
                        '<button type="button" class="btn delete btn-outline-danger rounded-pill" id="delete-' + element.id + '">Eliminar</button>';
    cell.classList.add('checkbox-group');
    cell.innerHTML = checkButton;
    for(let i = 0; i < keys.length; i++){
        let k = keys[i];
        cell = row.insertCell(-1);
        if(k == "id" && element[k] < 10)
            cell.innerHTML = "0" + element[k];
        else{
            cell.innerHTML = element[k];
            if(globalKey == GLOBAL_KEYS.MATERIAS && k == "id_carrera"){
                cell.classList.add('materia-carrera');
            }
        }
    }
    if(globalKey == GLOBAL_KEYS.CARRERAS){
        let materiasButton = '<a class="btn materias-btn" type="button" id="materias-' + element.id + '">Ver listado</a>'
        cell = row.insertCell(-1);
        cell.classList.add('td-btn');
        cell.innerHTML = materiasButton;
    }
    cell = row.insertCell(-1);
    cell.classList.add('td-btn');
    cell.innerHTML = actionsButton;
    loadFilters();
}

function getFilters(){
    let checksFilters = document.getElementsByClassName("check-filter");
    let filters = [];
    for (let c of checksFilters) {
        if(c.checked){
            filters.push(c.id.replace("f-", ""));
        }
    }
    return filters;
}

function searchValue(inputValue){
    let rows = getTable().rows;
    let cells = [];
    let cellsValue = '';
    let colValue = '';
    let filters = getFilters();
    let value;
    for(let i = 1; i < rows.length; i++) {
        cells = rows[i].cells;
        for(let j = 0; j < cells.length; j++) {
            colValue = rows[0].cells[j].innerHTML;
            if(filters.includes(colValue)){
                cellsValue += cells[j].innerHTML;
            }
        }
        value = cellsValue.toLowerCase().indexOf(inputValue) !== -1
        rows[i].style.display = value ? '' : 'none';
        cellsValue = '';
    }
}

function deleteRowElement(btnDelete){
    let actionsButton = btnDelete.parentElement;
    let row = actionsButton.parentElement;
    let tbody = row.parentElement;
    let table = tbody.parentElement;
    let id = btnDelete.id.replace("delete-", "");
    table.deleteRow(row.rowIndex);
    removeItem(id);
}

function getChecksIds(){
    let checks = document.getElementsByClassName("checkDelete");
    let ids = [];
    for (let c of checks) {
        if(c.checked){
            ids.push(c.id);
        }
    }
    return ids;
}

function checkDeleteMultiple(){
    if(getChecksIds().length == 0){
        noChecksModal.show();
    }else{
        deleteMultipleModal.show();
    }
}

function getElementInputs(){
    let form = document.getElementById("elementForm");
    return form.getElementsByClassName("form-control");
}

function clearElementModal(){
    for (let i of getElementInputs()) {
        i.value = '';
    }
}

function showSaveOrUpdateModal(id){
    clearElementModal();
    document.getElementById("ElementModalLabel").innerHTML = getTitleElementModal(id);
    if(id !== 0){
        let element = getElementById(id);
        for (let i of getElementInputs()) {
            i.value = element[i.name];
        }
    }
    elementModal.show();
}

function saveOrUpdateElement(){
    let element = getVoidElement();
    for (let i of getElementInputs()) {
        element[i.name] = i.value;
    }

    if(element.id == 0){
        element.id = generateId();
        addItem(element);
    }else{
        updateItem(element);
    }

    loadElementTable();
    elementModal.hide();
}

//EVENTS
window.addEventListener("load", function(){
    let deleteButtons = document.getElementsByClassName("delete");
    for (let btnDelete of deleteButtons) {
        btnDelete.addEventListener("click", function() {
            deleteModal.show();
        });
    }

    let editButtons = document.getElementsByClassName("edit");
    for (let btnEdit of editButtons) {
        btnEdit.addEventListener("click", function() {
            showSaveOrUpdateModal(btnEdit.id.replace("edit-", ""));
        });
    }

    let checks = document.getElementsByClassName("check-filter");
    for (let check of checks) {
        check.addEventListener("click", function() {
            let input = document.getElementById("input-find");
            searchValue(input.value.toLowerCase());
        });
    }

    let inputs = document.getElementsByClassName("onlyNumbers");
    for (let input of inputs) {
        input.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
        });
    }
});

if(document.getElementById("deleteElement")){
    document.getElementById("deleteElement").addEventListener("click", function() {
        let btnDeleteId = document.getElementById("elementId").value;
        let btnDelete = document.getElementById("delete-" + btnDeleteId);
        deleteRowElement(btnDelete);
    });
}

if(document.getElementById("input-find")){
    document.getElementById("input-find").addEventListener("input", function(){
        searchValue(this.value.toLowerCase());
    });
}

if(document.getElementById("deleteMultiple")){
    document.getElementById("deleteMultiple").addEventListener("click", function(){
        checkDeleteMultiple();
    });
}

if(document.getElementById("create")){
    document.getElementById("create").addEventListener("click", function(){
        showSaveOrUpdateModal(0)
    });
}

if(document.getElementById("deleteMultipleElements")){
    document.getElementById("deleteMultipleElements").addEventListener("click", function(){
        let ids = getChecksIds();
        let btnDeleteId = '';
        for(let i = 0; i < ids.length; i++) {
            btnDeleteId = "delete-" + ids[i];
            deleteRowElement(document.getElementById(btnDeleteId));
        }
    });
}

if(document.getElementById("checkMultiple")){
    document.getElementById("checkMultiple").addEventListener("click", function(){
        let checks = document.getElementsByClassName("checkDelete");
        for (let c of checks) {
            c.checked = this.checked;
        }
    });
}

if(document.getElementById("elementForm")){
    document.getElementById("elementForm").addEventListener("submit", function(event){
        if(this.checkValidity()){
            event.preventDefault();
            saveOrUpdateElement();
            return false;
        }
    });
}

//PROTOTYPES
function getElementById(id){}

function getVoidElement(){}

function createElement(){}

function loadElementTable(){}

function getTitleElementModal(id){}