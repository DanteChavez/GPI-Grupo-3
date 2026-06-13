import { spawn } from "child_process";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Leemos la configuración dinámicamente
const configPath = path.join(__dirname, "frontend.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const port = config.server?.port || 3000;

const isDev = process.argv.includes("--dev");
const command = isDev ? "dev" : "start";

console.log(`> Iniciando Next.js en modo ${command} en el puerto ${port}...`);

// Lanzamos Next.js usando un proceso hijo, compatible con Windows y Linux
const child = spawn("npx", ["next", command, "-p", port.toString()], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: port.toString() },
});

child.on("error", (err) => {
  console.error("Error al iniciar Next.js:", err);
});
