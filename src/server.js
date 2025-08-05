import fs from "fs/promises";
import http from "http";
import open from "open";

const PORT = 3000;

// Matches: {{ some_expression }}
const INTERPOLATE_EXP_REGEX = /\{\{\s*(\w+)\s*\}\}/g;

function interpolate(html, data) {
  return html.replace(
    INTERPOLATE_EXP_REGEX,
    (_, expression) => data[expression] || ""
  );
}

function formatNotes(notes) {
  return notes
    .map(
      (note) => `
      <li class="note">
        <p>${note.content}</p>
        <p class="tags">
            ${note.tags.map((tag) => `<span class="tag">${tag}</span>`)}
        </p>
      </li>    
    `
    )
    .join("\n");
}

function createServer(notes) {
  return http.createServer(async (req, res) => {
    const filePath = new URL("./template.html", import.meta.url);
    const template = await fs.readFile(filePath, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
}

function start(notes) {
  const server = createServer(notes);

  server.listen(PORT, () => {
    const address = `http://localhost:${PORT}`;
    console.log(`Server running on ${address}`);
    open(address);
  });
}

export { start };
