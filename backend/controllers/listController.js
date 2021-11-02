const List = require('../models/list.model')
const checkUser = require('../utils/checkUser');

exports.getAllLists = async (req, res, next) => {
    try {
      const userId = checkUser(req.cookies.token)
      const lists = await List.find({ user: userId });
      
      res.json(lists)
      
    } catch (err) {
      console.error(err);
      res.status(500).send()
    }
}

exports.getOneList =  async (req, res, next) => {
    const listId = req.params.id
    List.findById(listId)
      .then(list => res.json(list))
}

exports.addOneList = async(req, res, next) => {
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
}

exports.updateOneList = async (req, res, next) => {
    const listId = req.params.id
    List.findById(listId)
      .then(list => {
        list.title = req.body.title;
        list.todos = req.body.todos;
        list.save()
          .then(() => res.json('List Edited!'))
          .catch(err => res.status(400).json('Error: ' + err)); 
        })
}

exports.deleteOneList = async (req, res, next) => {
    const listId = req.params.id
    List.findByIdAndDelete(listId)
      .then(() => res.json('List deleted.'))
      .catch(err => res.status(400).json('Error: ' + err)); 
}
 



