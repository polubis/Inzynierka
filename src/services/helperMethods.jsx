export const isSomethingExists = (baseArray, keyName) => {
    for(let i = 0; i < baseArray.length; i++){
        if(baseArray[i][keyName] !== "")
            return true;
    }
        
    
    return false;
}