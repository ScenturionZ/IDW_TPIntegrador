document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem(GLOBAL_KEYS.ESTUDIANTES) == null){
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            let estudiantes = JSON.parse(text);
            setJSON(GLOBAL_KEYS.ESTUDIANTES, estudiantes)
        });
    }
    if(localStorage.getItem(GLOBAL_KEYS.CARRERAS) == null){
        readJSON(GLOBAL_VALUES.CARRERAS_JSON, function(text){
            let carreras = JSON.parse(text);
            setJSON(GLOBAL_KEYS.CARRERAS, carreras)
        });
    }
    
});