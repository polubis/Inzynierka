import _ from 'lodash';

export const filterDataByKeys = (methodsAndParams, items) => {
    const methodsToCallNames = Object.keys(methodsAndParams);
    let currentResult = [...items];

    for(let name in methodsToCallNames){
        const params = methodsAndParams[methodsToCallNames[name]];
        const result = methods[methodsToCallNames[name]](currentResult, params);
        currentResult = [...result];
    }

    return currentResult;
}


const methods = {
    orderBy: (items, params) => { 
        return _.orderBy(items, ...Object.values(params)) 
    },
    
    filter: (items, param, expectedValue) => items.filter(i => i[param] == expectedValue),

    take: (items, numberOfItemsToTake) => _.take(items, numberOfItemsToTake)
}

