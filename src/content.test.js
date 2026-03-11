// import runCommand from "./commandlistener.js";

// test('Should return command', () => {
//   expect(runCommand("kill")).toBe("kill");
// });

// test('Not a command', () => {
//   expect(runCommand("Trains")).toBe("Not a command");
// });

import { runCommand } from "./commandlistener.js";

test("can start command listener", () => {
  expect(typeof(runCommand())).toBe("function");
});