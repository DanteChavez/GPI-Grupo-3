import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Lee la configuración desde frontend.config.json
const frontendConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "frontend.config.json"), "utf-8")
);

const port = frontendConfig.server?.port ?? 3000;

const nextConfig: NextConfig = {
  /* Configuración del servidor leída desde frontend.config.json */
  serverExternalPackages: [],
};

// Exportamos el puerto para que puedan usarlo otros scripts
export { port };
export default nextConfig;
