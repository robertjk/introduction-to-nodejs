import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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
    (argv) => {
      console.log("argv.note:", argv.note);
    }
  )

  .command("find <filter>", "Get matching notes", (yargs) => {
    return (
      yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to the note.content",
        type: "string",
      }),
      async (argv) => {}
    );
  })

  .command("remove <id>", "Remove a note by id", (yargs) => {
    return (
      yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      }),
      async (argv) => {}
    );
  })

  .command("web [port]", "Launch website to see notes", (yargs) => {
    return (
      yargs.positional("port", {
        describe: "Port to bind on",
        default: 5000,
        type: "number",
      }),
      async (argv) => {}
    );
  })

  .command(
    "clean",
    "Remove all notes",
    () => {},
    async (argv) => {}
  )

  .option("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to the note",
  })

  .demandCommand(1)
  .parse();
