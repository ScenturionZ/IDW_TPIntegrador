//MODAL
if(document.getElementById("verInscriptosModal")){
    var inscriptosModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("verInscriptosModal"));
}

//FUNCTIONS
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
}

getElementById = function (id){
    return getMateriaById(id);
}

removeElementById = function(id){
    let inscripciones = getInscripcionesMaterias();
    let removeList = [];

    for (let i of inscripciones) {
        if(i.materia_id == id){
            removeList.push(i);
        }
    }
    for (let r of removeList) {
        inscripciones.splice(inscripciones.indexOf(r), 1);
    }
    localStorage.setItem(GLOBAL_KEYS.INSCRIPCIONES_MATERIAS, JSON.stringify(inscripciones));
    removeItem(id);
}
    

getTitleElementModal = function(id){
    let value = 'Nueva Materia'
    if(id !== 0){
        value = 'Editar ' + getNameMateriaById(id);
    }
    return value;
}

setElementNameDelete = function(id){
    document.getElementById("materiaName").innerHTML = getNameMateriaById(id);
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

    voidOption = '<option selected disabled value="">Seleccione una carrera</option>';
    let selectCuatrimestre = document.getElementsByName("cuatrimestre")[0];
    html = '';
    for(k of Object.keys(PERIODO_MATERIA)){
        html += '<option value="' + k + '">' + PERIODO_MATERIA[k] + '</option>';
    }
    selectCuatrimestre.innerHTML = voidOption + html;
});

document.getElementById("tablaMaterias").addEventListener('click', (e) => {
    if(e.target && e.target.tagName == 'BUTTON'){
        if(e.target.classList.contains("inscripcion")){
            let id = e.target.id.replace("materias-", "");
            let ul = document.getElementById("inscriptosList");
            let list = getInscripcionesMaterias();
            ul.innerHTML = "";
            for (let e of list){
                if(e.materia_id == id){
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