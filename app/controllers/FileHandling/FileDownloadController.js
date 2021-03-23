
exports.downloadFile = (req,res) => {
    let filePath = "uploads/" + req.params.filename;
    res.download(filePath)
}