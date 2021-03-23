const formidable = require('formidable')
const fs =require('fs-extra')

exports.fileUpload = (req,res) => {
    try {
        let form = new formidable.IncomingForm()
        form.uploadDir = "./uploads"
        form.keepExtensions = true

        form.parse(req, (err, fields, files) => {
            console.log("form.bytesReceived")
            
            console.log("file size: "+JSON.stringify(files.fileUploaded.size))
            console.log("file path: "+JSON.stringify(files.fileUploaded.path))
            console.log("file name: "+JSON.stringify(files.fileUploaded.name))
            console.log("file type: "+JSON.stringify(files.fileUploaded.type))
            console.log("lastModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate))
            res.json({message: "File uploaded successfully"}).status(200)
        })
    } catch (err) {
        console.log(err)
    }
}