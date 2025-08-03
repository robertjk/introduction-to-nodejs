import fs from "nodes:fs/promises";

const DB_PATH = new URL("/db.json", import.meta.url).pathname;

async function getDB() {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
}

async function saveDB(db) {
  const dbStr = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, dbStr);
}

async function insertIntoDB(note) {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
}

export { getDB, saveDB, insertIntoDB };
