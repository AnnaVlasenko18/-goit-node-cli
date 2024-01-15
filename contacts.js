const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

async function addContact(name, email, phone) {
  const contact = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
