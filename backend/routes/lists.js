const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const listController = require('../controllers/listController')


router.get('/',listController.getAllLists)
router.get('/:id', auth, listController.getOneList)
router.post('/add', auth, listController.addOneList)
router.post('/update/:id', auth, listController.updateOneList)
router.delete('/:id', auth, listController.deleteOneList)

module.exports = router;
