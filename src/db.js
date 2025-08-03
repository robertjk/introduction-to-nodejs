import fs from "fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url);

async function getDB() {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
}

async function saveDB(db) {
  const dbStr = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, dbStr);
  return db;
}

async function insertIntoDB(note) {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
}

export { getDB, saveDB, insertIntoDB };
