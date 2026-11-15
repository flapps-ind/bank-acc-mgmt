function validateAccountName(req, res, next){
    const { name } = req.body
    if(typeof name !== "string" || !name.trim()){
        return res.status(400).json({
            error: "Account name must be a non-empty string"
        })
    
    
    }
    req.body.name = name.trim()
    next()
}

module.exports = validateAccountName