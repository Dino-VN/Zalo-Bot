export async function LoadEnv() {
  // Kiểm tra sự tồn tại của môi trường Deno
  if (typeof Deno !== "undefined") {
    await import("jsr:@std/dotenv/load")
    globalThis.env = Deno.env.toObject();
  }
  // Kiểm tra sự tồn tại của môi trường Bun
  else if (typeof Bun !== "undefined") {
    globalThis.env = Bun.env;
  }
  // Kiểm tra môi trường Node.js
  else if (typeof process !== "undefined" && process.versions && process.versions.node) {
    const fs = await import("node:fs");
    const envFile = fs.readFileSync("./.env");
    const env = process.env;
    for (const envLine of envFile.toString().split("\n")) {
      if (!envLine.includes("=")) continue; // Bỏ qua dòng không chứa dấu '='
      const [name, val] = envLine.split("=");
      env[name.trim()] = val.trim(); // Cắt bỏ khoảng trắng dư thừa
    }
    globalThis.env = env;
  }
  // Không xác định được môi trường
  else {
    throw new Error("Không hỗ trợ runtime này");
  }
}
