import { getDB, saveDB, insertIntoDB } from "./db.js";

async function newNote(note, tags) {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insertIntoDB(newNote);
  return newNote;
}

async function getAllNotes() {
  const { notes } = await getDB();
  return notes;
}

async function findNotes(filter) {
  const { notes } = await getDB();

  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
}

async function removeNote(id) {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
}

async function removeAllNotes() {
  await saveDB({ notes: [] });
}

export { newNote, getAllNotes, findNotes, removeNote, removeAllNotes };
