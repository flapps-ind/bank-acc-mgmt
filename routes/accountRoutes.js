const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController')
const validateAccountName = require("../middlewares/validateAccountName")

router.get('/', accountController.getAllAccounts)
router.post('/', validateAccountName, accountController.createAccount)
router.delete('/:id', accountController.deleteAccount)
router.patch('/deposit/:id', accountController.deposit)
router.patch('/withdraw/:id', accountController.withdraw)

module.exports = router