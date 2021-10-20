const Concert = require('../models/concerts.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {

  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random * count);
    const con = await Concert.findOne().skip(rand);

    if(!con) res.status(404).json({ message: 'Not found'});
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getByPerformer = async (req, res) => {

  try {
    const dep = await Concert.find({performer: req.params.performer});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getByGenre = async (req, res) => {

  try {
    const dep = await Concert.find({genre: req.params.genre});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getByPrice = async (req, res) => {

  try {
    const dep = await Concert.find({price: {$gte: req.params.price_min, $lte: req.params.price_max} });
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getByDay = async (req, res) => {

  try {
    const dep = await Concert.find({day: req.params.day});
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = sanitize(req.body);

  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image  }});
      res.json({ message: 'OK', dep  });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.delete = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};