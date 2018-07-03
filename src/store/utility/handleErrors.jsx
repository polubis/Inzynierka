export const handleErrors = errorObject => {
    if(!errorObject){
        return createNewArray("Ups, coś poszło nie tak");
    }
    if(!errorObject.response){
        return createNewArray("Ups, coś poszło nie tak");
    }
    if(errorObject.response){
        if(errorObject.response.data){
            if(errorObject.response.data.error){
                return createNewArray(errorObject.response.data.error);
            }
        }
    }
    

    if(errorObject){
        if(errorObject.response.hasOwnProperty("status")){
            switch(errorObject.response.status){
                case 404:
                    return createNewArray("Nie znaleziono odpowiednich zasobów");
                case 500:
                    return createNewArray("Błąd serwera");
                default:
                break;
            }
        }
    }
    

    else{
        return createNewArray("Ups, coś poszło nie tak");
    }

    return createNewArray("");
}

const createNewArray = item => {
    return new Array(item);
}