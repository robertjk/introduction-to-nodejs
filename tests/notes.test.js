import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../src/db.js", () => ({
  insertIntoDB: vi.fn(),
  getDB: vi.fn(),
  saveDB: vi.fn(),
}));

const { insertIntoDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertIntoDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = {
    content: "Test note",
    tags: ["tag1", "tag2"],
  };
  insertIntoDB.mockResolvedValue(note);

  const result = await newNote(note.content, note.tags);
  expect(result.content).toEqual(note.content);
  expect(result.tags).toEqual(note.tags);
});

test("getAllNotes returns all the notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

describe("removeNote", () => {
  test("does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await removeNote(4);
    expect(result).toBeUndefined();
  });

  test("removes a note and returns it's id if it's found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    getDB.mockResolvedValue({ notes });

    const result = await removeNote(3);
    expect(result).toBe(3);
    expect(saveDB).toBeCalledWith({
      notes: [
        { id: 1, content: "note 1" },
        { id: 2, content: "note 2" },
      ],
    });
  });
});
