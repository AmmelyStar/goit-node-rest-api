import {
    listContacts,
    getContactById,
    addContact,
    
}  from "../services/contactsServices.js";




export const getAllContacts = async (req, res) => {
    try {
         const contacts = await listContacts();
        res.status(200).json(contacts);
        
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        })
        
    }
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
