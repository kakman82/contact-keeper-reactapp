const express = require('express');
const router = express.Router();

// @route:  GET api/contacts
// @dec:    Get all contacts depends on login user
// @access: Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route:  POST api/contacts
// @dec:    Add new contact
// @access: Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route:  PUT api/contacts/:id
// @dec:    Update contact
// @access: Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route:  DELETE api/contacts/:id
// @dec:    Delete contact
// @access: Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
