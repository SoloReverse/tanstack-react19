import * as fs from "node:fs";

export async function readCount(filepath: string) {
  return parseInt(
    await fs.promises.readFile(filepath, "utf-8").catch(() => "0"),
  );
}
