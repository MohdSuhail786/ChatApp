exports.test = (req,res) => {
    res.json({message:req.user})
}