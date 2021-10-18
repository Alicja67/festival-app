const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {

  try {
    const s = await Seat.find();
    res.json(s);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random * count);
    const s = await Seat.findOne().skip(rand);

    if(!s) res.status(404).json({ message: 'Not found'});
    else res.json(s);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {
  try {
      const s = await Seat.findById(req.params.id);
      if (!s) res.status(404).json({ message: 'Not found.....' });
      else res.json(s);
  }
  catch (err) {
      res.status(500).json({message: err});
  }
};


exports.post = async (req, res) => {
  const { day, seat, email, client } = req.body;

  try {
    const newSeat = Seat({ day, seat, email, client });
    await newSeat.save();
    res.json({
      message: 'ok',
      newSeat
    });
  }
  catch(err) {
    res.status(500).json({ message: err});
  }
};


exports.put = async (req, res) => {
  const { day, seat, email, client } = req.body;
  const { id } = req.params;

  try {
    const s = await Seat.findById(id);
    if(s) {
      s.day = day;
      s.seat = seat;
      s.email = email;
      s.client = client;
      await s.save();
      res.json({
        message: 'Ok',
        s
      })
    }
    else res.status(404).json({ message: 'Not found' })
  }
catch(err) {
  res.status(500).json({ message: err });
}
};


exports.delete = async (req, res) => {

  try {
    const s = await Seat.findById(req.params.id);
    if(s) {
      await Seat.deleteOne({ _id: req.params.id});
      res.json({
        message: 'Ok',
        s
      });
    }
    else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};