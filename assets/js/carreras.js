//MODAL
var listModal = new bootstrap.Modal(document.getElementById("verListaModal"), {});

//OVERRIDES
getVoidElement = function(){
    return {
        id : 0,
        nombre : '',
        tipo : '',
        modalidad : '',
        duracion : 0
    }
}

//FUNCTIONS
function getCarreras(){
    return getJSON();
}

function getMaterias(){
    return JSON.parse(localStorage.getItem(GLOBAL_KEYS.MATERIAS));
}

function removeCarrera(id){
    removeItem(id)
}

function addCarrera(element){
    addItem(element);
}

function getNameCarreraById(id){
    let carrera = getElementById(id);
    return carrera.nombre;
}


getTitleElementModal = function(id){
    let value = 'Nueva carrera'
    if(id !== 0){
        value = 'Editar a ' + getNameCarreraById(id);
    }
    return value;
}

getElementById = function (id){
    return getCarreras().find(e => e.id == id);
}



loadElementTable = function (){
    getTable().getElementsByTagName('tbody')[0].innerHTML = '';
    let array = getCarreras();
    if(array == null){
        readJSON(GLOBAL_VALUES.CARRERAS_JSON, function(text){
            let carreras = JSON.parse(text);
            setJSON(carreras);
            for (let e of getCarreras()) {
                appendElementTable(e);
            }
        });
    }else{
        for (let e of array) {
            appendElementTable(e);
        }
    }
}


function modalVerMaterias(id){
    let ul = document.getElementById("ulModalMaterias");
    let materias = searchMateriasByIdCarrera(id);
    ul.innerHTML = "";
    for (let m of materias){
        const li = document.createElement("li");
        li.classList.add('list-group-item');
        li.innerHTML = m;
        ul.appendChild(li);
    }
}

function searchMateriasByIdCarrera(id){
    let materias = getMaterias();
    let materiasByCarrera = [];
    for (let e of materias){
        if (e.id_carrera == id ){
            materiasByCarrera.push(e.nombre);
        }
    }
    return materiasByCarrera;
}

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    globalKey = GLOBAL_KEYS.CARRERAS;
    loadElementTable();
});

window.addEventListener("load", function(){
    let materiasButtons = document.getElementsByClassName("materias-btn");
    for (let btn of materiasButtons) {
        btn.addEventListener("click", function() {
            let id = this.id.replace("materias-", "");
            modalVerMaterias(id)
            listModal.show();
        });
    }
});

window.addEventListener("load", function(){
    let deleteButtons = document.getElementsByClassName("delete");
    for (let btnDelete of deleteButtons) {
        btnDelete.addEventListener("click", function() {
            let id = this.id.replace("delete-", "");
            document.getElementById("elementId").value = id;
            document.getElementById("carreraName").innerHTML = getNameCarreraById(id);
        });
    }
});
