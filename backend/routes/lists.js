
const express = require('express');
const router = express.Router();
const List = require('../models/list.model')
const auth = require("../middleware/auth")

// Get all lists
router.get('/', auth, async(req, res, next) => {
    try {
      const lists = await List.find();
      
      res.json(lists)
      
    } catch (err) {
      console.error(err);
      res.status(500).send()
    }
  })



// Get all lists for one user with user id
router.route('/user/:id')
  .get((req, res, next) => {
    List.find({
      "user": req.params.id
    })
      .then(lists => res.json(lists))
  })

// Get one list with list id
router.route('/:id')
  .get((req, res, next) => {
    List.findById(req.params.id)
      .then(list => res.json(list))
  })


// Add a list
// lägg till auth?
router.route('/add')
  .post( async(req, res, next) => {
    try {
      const newList = new List({
        "user": req.body.user,
        "title": req.body.title,
        "todos": req.body.todos
      });
  
      const savedList = await newList.save()

      res.json(savedList);
      
    } catch (err) {
      console.error(err);res.status(500).send()
    }
  })

// Update a list with list id
router.route('/update/:id')
  .post((req, res, next) => {

    List.findById(req.params.id)
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
    List.findByIdAndDelete(req.params.id)
      .then(() => res.json('List deleted.'))
      .catch(err => res.status(400).json('Error: ' + err)); 
  })
 

module.exports = router;
