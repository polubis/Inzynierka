export const getASpecyficCookieValue = (nameOfValue, cookies) => {
    const index = cookies.search(nameOfValue);
    let value = "";
    
    if(index === -1)
        return "";
    
    else{
        for(let i = index + nameOfValue.length+1; i < cookies.length; i++){
            if(cookies.charAt(i) === ";")
                return value;

            else
                value += cookies.charAt(i);
        }
    }
    return value;
}


export const setCookie = (name, expDays, path, value) => {
    const date = new Date();
    date.setTime(date.getTime() + (expDays*24*60*60*1000));
    const expireDate = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expireDate + ";path=" + path;
}

export const deleteCookie = (name, expDate = "Thu, 01 Jan 1970 00:00:01 GMT") => {
    document.cookie = name + "=; expires=" + expDate;
}