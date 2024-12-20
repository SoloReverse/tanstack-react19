import * as fs from "node:fs";
import { createServerFn } from "@tanstack/start";

// const filePath = "count.txt";

export async function readCount() {
  const filePath = "count.txt";
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  );
}

export const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  const filePath = "count.txt";
  return readCount();
});

export const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const filePath = "count.txt";
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });
