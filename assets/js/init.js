document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem(GLOBAL_KEYS.ESTUDIANTES) == null){
        globalKey = GLOBAL_KEYS.ESTUDIANTES;
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            let estudiantes = JSON.parse(text);
            setJSON(estudiantes)
        });
    }
    
    if(localStorage.getItem(GLOBAL_KEYS.CARRERAS) == null){
        globalKey = GLOBAL_KEYS.CARRERAS;
        readJSON(GLOBAL_VALUES.CARRERAS_JSON, function(text){
            let carreras = JSON.parse(text);
            setJSON(carreras)
        });
    }
    
});