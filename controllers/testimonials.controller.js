const Testimonial = require('../models/testimonials.model');
const sanitize = require('mongo-sanitize');


exports.getAll = async (req, res) => {

  try {
    const tes = await Testimonial.find();
    res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random * count);
    const tes = await Testimonial.findOne().skip(rand);

    if(!tes) res.status(404).json({ message: 'Not found'});
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const tes = await Testimonial.findById(id);
    if(tes) res.json(tes);
    else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.post = async (req, res) => {
  const { author, text } = sanitize(req.body);

  try {
    const newTestimonial = Testimonial({ author, text });
    await newTestimonial.save();
    res.json({
      message: 'ok',
      newTestimonial
    });
  }
  catch(err) {
    res.status(500).json({ message: err});
  }
};


exports.put = async (req, res) => {
  const { author, text } = req.body;
  const { id } = req.params;

  try {
    const tes = await Testimonial.findById(id);
    if(tes) {
      tes.author = author;
      tes.text = text;
      await tes.save();
      res.json({
        message: 'Ok',
        tes
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
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id});
      res.json({
        message: 'Ok',
        tes
      });
    }
    else res.status(404).json({ message: 'Not found'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};