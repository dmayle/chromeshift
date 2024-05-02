import { attach, detachTab } from "./actions";
import { checkCommandShortcuts, Direction } from "./helpers";

/** All of the commands supported by this extension */
enum Commands {
  DETACH = "detach-tab",
  ATTACH_LEFT = "attach-left",
  ATTACH_RIGHT = "attach-right",
  ATTACH_UP = "attach-up",
  ATTACH_DOWN = "attach-down",
}

/** At install time, we make sure that our shortcuts are added properly */
chrome.runtime.onInstalled.addListener(({ reason }) => {
  // At install time, check to see if shortcuts have a conflict
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

/**
 * Simple command dispatch via a switch statement.
 */
chrome.commands.onCommand.addListener((command: string) => {
  switch (Commands[command as keyof typeof Commands]) {
    case Commands.DETACH:
      detachTab();
      break;
    case Commands.ATTACH_LEFT:
      attach(Direction.LEFT);
      break;
    case Commands.ATTACH_RIGHT:
      attach(Direction.RIGHT);
      break;
    case Commands.ATTACH_UP:
      attach(Direction.UP);
      break;
    case Commands.ATTACH_DOWN:
      attach(Direction.DOWN);
      break;
    default:
      console.log("Unsupported command: ", command);
      break;
  }
});
