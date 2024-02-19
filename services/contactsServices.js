import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "../db/contacts.json");

export async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath, "utf-8");
    
    console.log(data)
    return JSON.parse(data);
}

export async function getContactById(contactId) {
     // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
 
}

export async function addContact(data) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,

    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    
}


export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return { message: 'Not found' };        
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;

    
}

export async function updContacts(contactId, data) {
  const contacts = await listContacts();

  const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
        return { message: 'Not found' };      
  }

  contacts[index] = Object.assign(contacts[index], data);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}



