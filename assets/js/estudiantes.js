//FUNCTIONS
function getEstudiantes(){
    return getJSON(globalKey);
}

function removeEstudiante(id){
    removeItem(id)
}

function addEstudiante(element){
    addItem(element);
}

function getNameEstudianteById(id){
    let estudiante = getElementById(id);
    return estudiante.nombre + ' ' + estudiante.apellido;
}

//OVERRIDES
getVoidElement = function(){
    return {
        id : 0,
        nombre : '',
        apellido : '',
        dni : '',
        email : ''
    }
}

loadElementTable = function (){
    getTable().getElementsByTagName('tbody')[0].innerHTML = '';
    let array = getEstudiantes();
    for (let e of array) {
        appendElementTable(e);
    }
}

getElementById = function (id){
    return getEstudiantes().find(e => e.id == id);
}

getTitleElementModal = function(id){
    let value = 'Nuevo estudiante'
    if(id !== 0){
        value = 'Editar a ' + getNameEstudianteById(id);
    }
    return value;
}

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    globalKey = GLOBAL_KEYS.ESTUDIANTES;
});

window.addEventListener("load", function(){
    loadElementTable();
    let deleteButtons = document.getElementsByClassName("delete");
    for (let btnDelete of deleteButtons) {
        btnDelete.addEventListener("click", function() {
            let id = this.id.replace("delete-", "");
            document.getElementById("elementId").value = id;
            document.getElementById("estudianteName").innerHTML = getNameEstudianteById(id);
        });
    }

    let inputs = document.getElementsByClassName("onlyNumbers");
    for (let input of inputs) {
        input.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
        });
    }
});