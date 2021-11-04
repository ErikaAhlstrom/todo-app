const List = require('../models/list.model');
const checkUser = require('../utils/checkUser');

exports.getAllLists = async (req, res) => {
  try {
    const userId = checkUser(req.cookies.token);
    const lists = await List.find({ user: userId });
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.getOneList = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await List.findById(listId);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.addOneList = async (req, res) => {
  try {
    const userId = checkUser(req.cookies.token);

    const newList = await new List({
      user: userId,
      title: req.body.title,
      todos: req.body.todos,
    });

    newList.save();
    res.send(newList);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.updateOneList = async (req, res) => {
  try {
    const listId = req.params.id;
    const editedList = {
      title: req.body.title,
      todos: req.body.todos,
    };
    await List.findOneAndUpdate({ _id: listId }, editedList, { new: true });
    res.status(200).json('Updated');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.deleteOneList = async (req, res) => {
  try {
    const listId = req.params.id;
    await List.findByIdAndDelete(listId);
    res.json('List deleted.');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
