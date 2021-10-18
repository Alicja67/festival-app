const express = require('express');
const router = express.Router();
const Seat = require('../models/seats.model');


router.get('/seats', async (req, res) => {

  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.get('/seats/:id', async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.post('/seats', async (req, res) => {

  try {
    const { day, seat, email, client } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, email: email, client: client });
    await newSeat.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
});


router.put('/seats/:id', async (req, res) => {
  const { day, seat, email, client } = req.body;

  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, email: email, client: client  }});
      res.json({ message: 'OK', dep  });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.delete('/seats/:id', async (req, res) => {

  try {
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', dep });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;