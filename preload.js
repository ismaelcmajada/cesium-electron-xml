const { contextBridge } = require('electron');
const fs = require('fs')

contextBridge.exposeInMainWorld(
    'api', {
        loadXML,
    }
);


function loadXML () {
    let data = fs.readFileSync("./data.xml", 'utf-8');
    return data
}