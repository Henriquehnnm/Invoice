import { cli } from "./cli";
import { initDB } from "./data/database";

function main() {
  initDB();
  cli();
}

main();
