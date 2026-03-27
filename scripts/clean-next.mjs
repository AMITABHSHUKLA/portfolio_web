import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const nextDir = path.join(root, ".next");

try {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next");
} catch (err) {
  const code = err && typeof err === "object" && "code" in err ? err.code : "";
  if (code === "EPERM" || code === "EBUSY") {
    console.error(`
Could not delete .next (files are locked).

Do this on Windows:
  1. Stop every "next dev" / "npm run dev" terminal.
  2. Task Manager → end any extra "Node.js" processes still running.
  3. If you use Cursor: stop background dev servers, or run commands in Windows Terminal outside the sandbox.
  4. Run "npm run clean" again.

If it still fails: reboot once (clears stubborn locks), or exclude this project folder from real-time antivirus scanning.
`);
    process.exit(1);
  }
  throw err;
}
