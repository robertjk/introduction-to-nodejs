const noteContent = process.argv[2];
const newNote = {
  content: noteContent,
  id: Date.now(),
};
console.log(newNote);
