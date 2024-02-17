import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from '../services/contactsServices.js'





export const getAllContacts = async (req, res) => {
    try {
        const contacts = await listContacts();
              res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: 'Server ljhrljh'
        });
    }
};

export const getOneContact = async (req, res) => {
     try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

export const deleteContact = (req, res) => {};

export const createContact = async (req, res) => {
    try {
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};


export const updateContact = (req, res) => {};
