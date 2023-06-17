//MODAL
if(document.getElementById("verListaModal")){
    var listModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("verListaModal"));
}

if(document.getElementById("verInscriptosModal")){
    var inscriptosModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("verInscriptosModal"));
}

//FUNCTIONS
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

function addCarrera(element){
    addItem(element);
}

function getNameCarreraById(id){
    let carrera = getElementById(id);
    return carrera.nombre;
}

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

getElementById = function (id){
    return getCarreraById(id);
}

removeElementById = function(id){
    let inscripciones = getInscripcionesCarreras();
    let removeList = [];
    let materias = getMaterias();

    for (let i of inscripciones) {
        if(i.carrera_id == id){
            removeList.push(i);
        }
    }
    for (let r of removeList) {
        inscripciones.splice(inscripciones.indexOf(r), 1);
    }
    for(let m of materias){
        if (m.id_carrera == id){
            m.id_carrera=0;
        }
    }
    localStorage.setItem(GLOBAL_KEYS.MATERIAS, JSON.stringify(materias));
    localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_CARRERAS, JSON.stringify(inscripciones));
    removeItem(id);
}

getTitleElementModal = function(id){
    let value = 'Nueva carrera'
    if(id !== 0){
        value = 'Editar ' + getNameCarreraById(id);
    }
    return value;
}

setElementNameDelete = function(id){
    document.getElementById("carreraName").innerHTML = getNameCarreraById(id);
}

//EVENTS
document.addEventListener("DOMContentLoaded", function(){
    globalKey = GLOBAL_KEYS.CARRERAS;
    loadElementTable();
    let voidOption = '<option selected disabled value="">Seleccione un tipo</option>';
    let selectTipo = document.getElementsByName("tipo")[0];
    let selectModalidad = document.getElementsByName("modalidad")[0];
    let html = '';
    for(k of Object.keys(TIPO_CARRERA)){
        html += '<option value="' + k + '">' + TIPO_CARRERA[k] + '</option>';
    }
    selectTipo.innerHTML = voidOption + html;

    voidOption = '<option selected disabled value="">Seleccione una modalidad</option>';
    html = '';
    for(k of Object.keys(MODALIDAD_CARRERA)){
        html += '<option value="' + k + '">' + MODALIDAD_CARRERA[k] + '</option>';
    }
    selectModalidad.innerHTML = voidOption + html;
});

document.getElementById("tablaCarreras").addEventListener('click', (e) => {
    if(e.target && e.target.tagName == 'A'){
        if(e.target.classList.contains("materias-btn")){
            let id = e.target.id.replace("materias-", "");
            modalVerMaterias(id);
            listModal.show();
        }
    }
    if(e.target && e.target.tagName == 'BUTTON'){
        if(e.target.classList.contains("inscripcion")){
            let id = e.target.id.replace("carreras-", "");
            let ul = document.getElementById("inscriptosList");
            let list = getInscripcionesCarreras();
            ul.innerHTML = "";
            for (let e of list){
                if(e.carrera_id == id){
                    const li = document.createElement("li");
                    const estudiante = getEstudianteById(e.estudiante_id);
                    li.classList.add('list-group-item');
                    li.innerHTML = estudiante.nombre + ' ' + estudiante.apellido;
                    ul.appendChild(li);
                }
            }
            inscriptosModal.show();
        }
    }
});