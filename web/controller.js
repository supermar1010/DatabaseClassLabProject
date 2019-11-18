let path = require('path');

async function serveStaticFiles(req, res) {
    res.sendFile(path.resolve('./html/index.html'));
}

async function uploadFiles(req, res) {
    console.log("Upload files");
    let name= req.body.name;
    // This is base64 encoded can be written to harddisk like this: fs.writeFile("out.png", base64Data, 'base64', (err) => console.error(err))
    let content = req.body.content;
    let lastModified = req.body.lastModified;
    let file = new File(name, content.split(',')[1], lastModified);
    console.log(file);
    res.send();
}

class File{
    constructor(name, content, lastModified) {
        this.name = name;
        this.content = content;
        this.lastModified = lastModified;
    }
}

module.exports = {serveStaticFiles, uploadFiles, File};
