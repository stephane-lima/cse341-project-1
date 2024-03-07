const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contactsController");

// Retrieve All Contacts
router.get("/", contactsController.getAllContacts);

// Retrieve Contact by Id
router.get("/:id", contactsController.getSingleContact);

// Create New Contact
router.post("/", contactsController.createContact);

// Update Contact
router.put("/:id", contactsController.updateContact);

// Delete Contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;