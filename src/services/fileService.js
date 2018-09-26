import * as JSZip from 'jszip';

export const extractFilesFromZip = blobFile => {
    return new Promise((resolve) => {
        const zip = new JSZip();
        zip.loadAsync(blobFile).then(zipFiles => {
            const readedFiles = [];
        
            for(let key in zipFiles.files){
                const binary = zipFiles.files[key]._data.compressedContent;
                const blob = new Blob([binary], {type: 'audio/ogg'});
                const blobUrl = URL.createObjectURL(blob);
                readedFiles.push({name: key, blobUrl: blobUrl});
            }

            resolve(readedFiles);
        });
    })
}
