const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = Returns all contacts
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingleContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = Returns a contact bt ID
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = Creates a new contact
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (response.acknowledged) {
        res.status(200).send("Successful Response")
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the contact");
    }
}

const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = Updates an existing contact
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection("contacts").replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(200).send("Successful Response")
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the contact");
    }
}

const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    //#swagger.summary = Deletes an existing contact
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("contacts").deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(200).send("Successful Response")
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the contact");
    }
}

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };