//MODAL
var listModal = new bootstrap.Modal(document.getElementById("verListaModal"), {});

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

function createCarrera(){
    //leemos inputs y seteamos ID
    //creas element
    addEstudiante(element);
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
    console.log(materias);
    let materiasByCarrera = [];
    for (let e of materias){
        if (e.id_carrera == id ){
            materiasByCarrera.push(e.nombre);
        }
    }
    console.log(materiasByCarrera);
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
    }});

