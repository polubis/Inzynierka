import * as JSZip from 'jszip';

export const extractFilesFromZip = blobFile => {
    return new Promise((resolve) => {
        const zip = new JSZip();
        zip.loadAsync(blobFile).then(zipFiles => {
            const readedFiles = [];
        
            for(let key in zipFiles.files){
                readedFiles.push({name: key, data: zipFiles.files[key]._data});
            }
            resolve(readedFiles);
        });
    })
}
