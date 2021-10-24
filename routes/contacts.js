const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route:  GET api/contacts
// @dec:    Get all contacts depends on login user
// @access: Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route:  POST api/contacts
// @dec:    Add new contact
// @access: Private
router.post(
  '/',
  auth,
  body('name', 'Name is required!').not().isEmpty(),
  // optional parametresi req.body de phone varsa numeric kontrol ediyor yoksa geçiyor
  body('phone', 'Please enter a valid phone number!').isNumeric().optional({
    nullable: true,
    checkFalsy: true,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error!');
    }
  }
);

// @route:  PUT api/contacts/:id
// @dec:    Update contact
// @access: Private
router.put('/:id', auth, async (req, res) => {
  // kaydederken validate yaptığım için haricen aşağıda da req.body de varsa aldığım için gerek yok haricen validate yapmaya

  // if body empty {} then;
  if (Object.keys(req.body).length === 0)
    return res.status(400).send('No data provided!');

  const { name, email, phone, type } = req.body;

  // Build a contact object for updating
  let contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contactToUpdate = await Contact.findById(req.params.id);

    if (!contactToUpdate)
      return res.status(404).json({ msg: 'Contact not found!' });

    // Make sure user owns this contact
    // Db den dönen user objectId old için karşılaştırabilmek için stringe çevirmek gerek!
    if (contactToUpdate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized for update!' });
    }

    contactToUpdate = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res
      .status(201)
      .json({ msg: 'Contact updated!', updatedContact: contactToUpdate });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
});

// @route:  DELETE api/contacts/:id
// @dec:    Delete contact
// @access: Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contactToDelete = await Contact.findById(req.params.id);

    if (!contactToDelete)
      return res.status(404).json({ msg: 'Contact not found!' });

    // Make sure user owns this contact
    // Db den dönen user objectId old için karşılaştırabilmek için stringe çevirmek gerek!
    if (contactToDelete.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized for delete!' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: 'Contact deleted!' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error!');
  }
});

module.exports = router;
