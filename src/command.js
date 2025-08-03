import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  findNotes,
  getAllNotes,
  newNote,
  removeAllNotes,
  removeNote,
} from "./notes.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log(`New note!: ${note.id}`);
    }
  )

  .command(
    "all",
    "Get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )

  .command(
    "find <filter>",
    "Get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to the note.content",
        type: "string",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )

  .command(
    "remove <id>",
    "Remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log(id);
    }
  )

  .command(
    "web [port]",
    "Launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "Port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      // TODO
    }
  )

  .command(
    "clean",
    "Remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed");
    }
  )

  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to the note",
  })

  .demandCommand(1)
  .parse();
