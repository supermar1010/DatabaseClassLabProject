let path = require('path');
let database = require('../database/main');

async function serveStaticFiles(req, res) {
    res.sendFile(path.resolve('./html/index.html'));
}

async function uploadFiles(req, res) {
    console.log("Upload files");
    let name= req.body.name;
    // This is base64 encoded can be written to harddisk like this: fs.writeFile("out.png", base64Data, 'base64', (err) => console.error(err))
    let content = req.body.content;
    let lastModified = req.body.lastModified;
    let size = req.body.size;
    // TODO remove abc
    let file = new File(name, content.split(',')[1], lastModified, size);
    res.send();
    database.saveFile(file);
}

class File{
    constructor(name, content, lastModified, size) {
        this.name = name;
        this.content = content;
        this.lastModified = lastModified;
        this.size = size;
    }
}

module.exports = {serveStaticFiles, uploadFiles, File};
