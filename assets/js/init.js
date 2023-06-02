document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem(GLOBAL_KEYS.ESTUDIANTES) == null){
        readJSON(GLOBAL_VALUES.ESTUDIANTES_JSON, function(text){
            let estudiantes = JSON.parse(text);
            setJSON(GLOBAL_KEYS.ESTUDIANTES, estudiantes)
        });
    }
});