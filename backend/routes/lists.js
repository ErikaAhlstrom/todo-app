
const express = require('express');
const router = express.Router();
const List = require('../models/list.model')
const auth = require("../middleware/auth")
const checkUser = require('../utils/checkUser');


// Get all lists
router.get('/', auth, async(req, res, next) => {
    try {
      let userId = checkUser(req.cookies.token)
      const lists = await List.find({ user: userId });
      
      res.json(lists)
      
    } catch (err) {
      console.error(err);
      res.status(500).send()
    }
  })


// Get one list with list listid
router.route('/:id')
  .get((req, res, next) => {
    const listId = req.params.id
    List.findById(listId)
      .then(list => res.json(list))
  })


// Add a list
// lägg till auth?
router.post('/add', auth, async(req, res, next) => {
    try {
      const userId = checkUser(req.cookies.token)

      const newList = await new List({
        user: userId,
        title: req.body.title,
        todos: req.body.todos
      });
  
      newList.save()
      res.send(newList)
      
    } catch (err) {
      console.error(err);res.status(500).send()
    }
  })

// Update a list with list id
router.route('/update/:id')
  .post((req, res, next) => {
    const listId = req.params.id
    List.findById(listId)
      .then(list => {
        list.title = req.body.title;
        list.todos = req.body.todos;
        list.save()
          .then(() => res.json('List Edited!'))
          .catch(err => res.status(400).json('Error: ' + err)); 
      })
    })

// Delete a list
router.route('/:id')
  .delete((req, res, next) => {
    const listId = req.params.id
    List.findByIdAndDelete(listId)
      .then(() => res.json('List deleted.'))
      .catch(err => res.status(400).json('Error: ' + err)); 
  })
 

module.exports = router;
