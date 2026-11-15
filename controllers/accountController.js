const accountModel = require('../models/accountModel')

function getAllAccounts(req, res){
    const accounts = accountModel.getAllAccounts()
    if(accounts == false) return res.send("No accounts currently")
    return res.json(accounts)
}

function createAccount(req, res){
    const {name, deposit} = req.body || {}
    const newAccount = accountModel.createAccount(name, deposit)
    if(newAccount === null) return res.status(400).json({"error": "Deposit amount must be positive"})
    res.status(201).json(newAccount)
}

function deleteAccount(req, res){
    const id = parseInt(req.params.id)
    if(!id) return res.status(400).send("Id not given")
    const deletedAccount = accountModel.deleteAccount(id)
    if(deletedAccount === null) return res.send("Account not found")
    return res.json(deletedAccount)
}

function deposit(req, res){
    const id = parseInt(req.params.id)
    const {deposit} = req.body || {}
    const depositAccount = accountModel.deposit(id, deposit)
    if(depositAccount === null) return res.status(400).json({"error": "Deposit amount must be positive"})
    return res.json(depositAccount)
}

function withdraw(req, res){
    const id = parseInt(req.params.id)
    const {withdraw} = req.body || {}
    const withdrawnAccount = accountModel.withdrawal(id, withdraw)
    if(withdrawnAccount === null) return res.status(400).json({"error": "Withdrawn amount more than balance"})
    return res.json(withdrawnAccount)
}

module.exports = {
    createAccount,
    getAllAccounts, 
    deleteAccount,
    deposit,
    withdraw
}