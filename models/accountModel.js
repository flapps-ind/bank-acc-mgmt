let accounts = []
let nextId = 1

function createAccount(name, deposit = 0){
    if(accounts == false) nextId = 1
    if(deposit<0) return null
    const newAccount = {
        id: nextId++,
        name: name,
        balance: deposit
    }
    accounts.push(newAccount)
    return newAccount
}

function getAllAccounts(){
    return accounts
}

function getAccountById(id){
    const account = accounts.find(acc=>acc.id === Number(id))
    if(!account) return null
    return account
}

function deleteAccount(id){
    const accIndex = accounts.findIndex(acc=>acc.id === Number(id))
    if(accIndex === -1) return null
    const deletedAccount = accounts.splice(accIndex, 1)
    return deletedAccount
}

function deposit(id, depositAmt){
    const account = getAccountById(id)
    if(depositAmt<0) return null
    account.balance += depositAmt
    return account
}

function withdrawal(id, withdrawAmt){
    const account = getAccountById(id)
    if(withdrawAmt>account.balance) return null
    account.balance -= withdrawAmt
    return account
}



module.exports = {
    createAccount,
    getAllAccounts,
    deleteAccount, 
    deposit,
    withdrawal
}