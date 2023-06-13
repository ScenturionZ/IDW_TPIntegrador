//FUNCTIONS
function getMaterias(){
    return getJSON();
}

function getCarreras(){
    return JSON.parse(localStorage.getItem(GLOBAL_KEYS.CARRERAS));
}

function getCarreraById(id){
    return getCarreras().find(c => c.id == id);
}

function removeMateria(id){
    removeItem(id)
}

function addMateria(element){
    addItem(element);
}

function getNameMateriaById(id){
    let materia = getElementById(id);
    return materia.nombre;
}

//OVERRIDES
getVoidElement = function(){
    return {
        id : 0,
        nombre : '',
        horas : 0,
        id_carrera: 0
    }
}

loadElementTable = function (){
    getTable().getElementsByTagName('tbody')[0].innerHTML = '';
    let array = getMaterias();
    if(array == null){
        readJSON(GLOBAL_VALUES.MATERIAS_JSON, function(text){
            let materias = JSON.parse(text);
            setJSON(materias);
            for (let e of getMaterias()) {
                appendElementTable(e);
            }
        });
    }else{
        for (let e of array) {
            appendElementTable(e);
        }
    }
    let carreraCells = document.getElementsByClassName("materia-carrera");
    for (let cell of carreraCells) {
        cell.innerHTML = getCarreraById(cell.innerHTML).nombre;
    }
}

getElementById = function (id){
    return getMaterias().find(e => e.id == id);
}

getTitleElementModal = function(id){
    let value = 'Nueva Materia'
    if(id !== 0){
        value = 'Editar ' + getNameMateriaById(id);
    }
    return value;
}

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    globalKey = GLOBAL_KEYS.MATERIAS;
    loadElementTable();
    let voidOption = '<option selected disabled value="">Seleccione una carrera</option>';
    let selectCarrera = document.getElementsByName("id_carrera")[0];
    let html = '';
    for(c of getCarreras()){
        html += '<option value="' + c.id + '">' + c.nombre + '</option>';
    }
    selectCarrera.innerHTML = voidOption + html;
});

window.addEventListener("load", function(){
    let deleteButtons = document.getElementsByClassName("delete");
    for (let btnDelete of deleteButtons) {
        btnDelete.addEventListener("click", function() {
            let id = this.id.replace("delete-", "");
            document.getElementById("elementId").value = id;
            document.getElementById("materiaName").innerHTML = getNameMateriaById(id);
        });
    }


});