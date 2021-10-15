const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

const getElementFromLink = (req) => (
    db.seats.find(element => element.id === parseInt(req.params.id))
  );

  router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });


  router.route('/seats/:id').get((req, res) => {
    res.json(getElementFromLink(req));
  });


  router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const newElement = { id: uuidv4(), day: day, seat: seat, client: client, email: email };
    db.seats.push(newElement);
    res.send( { message: 'OK' } );
  });

  router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const updatedElement = ({ id: req.params.id, day: day, seat: seat, client: client, email: email });
    db.concerts[db.concerts.indexOf(getElementFromLink(req))] = updatedElement;
    res.send( { message: 'OK' } );
  });

  router.route('/seats/:id').delete((req, res) => {
    db.seats.splice(db.seats.indexOf(getElementFromLink(req)), 1);
    res.send( { message: 'OK' } );
  });


module.exports = router;