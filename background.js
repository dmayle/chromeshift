/** All of the commands supported by this extension */
const Commands = {
  DETACH: Symbol.for("detach-tab"), // Symbol.for ensures that symbols created from strings (e.g. command name) match these symbols
  ATTACH_LEFT: Symbol.for("attach-left"),
  ATTACH_RIGHT: Symbol.for("attach-right"),
  ATTACH_UP: Symbol.for("attach-up"),
  ATTACH_DOWN: Symbol.for("attach-down")
}

/** The cardinal directions supported by this extension */
const Directions = {
  UP: Symbol("up"), // Symbols created from strings will not match these, you must use these Symbols explicitly
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right")
}

/** At install time, we make sure that our shortcuts are added properly */
chrome.runtime.onInstalled.addListener(({reason}) => {
  // At install time, check to see if shortcuts have a conflict
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

/**
 * Gets all of this extension's commands from Chrome, and checks to make sure
 * that extensions are configured
 * */
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let {name, shortcut} of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      console.log("Not all shortcuts were registered!", missingShortcuts);
    }
  });
}

/**
 * Simple command dispatch via a switch statement.
 */
chrome.commands.onCommand.addListener((command) => {
  switch (Symbol.for(command)) {
    case Commands.DETACH:
      detachTab();
      break;
    case Commands.ATTACH_LEFT:
      attach(Directions.LEFT);
      break;
    case Commands.ATTACH_RIGHT:
      attach(Directions.RIGHT);
      break;
    case Commands.ATTACH_UP:
      attach(Directions.UP);
      break;
    case Commands.ATTACH_DOWN:
      attach(Directions.DOWN);
      break;
    default:
      console.log("Unsupported command", command, Symbol.for(command));
      break;
  }
});

/**
 * Detaches all selected tabs from the currently focused window, moves them
 * into a new window and ensures that all of the tabs are still selected
 */
function detachTab() {
  // Detach the first highlighted tab into a window, then move any other
  // highlighted tabs into same window
  chrome.windows.getLastFocused({"populate": true}
  ).then((focusedWindow) => {
    // Collect focused tabs from the current window
    let focusedTabs = [];
    for (let tab of focusedWindow.tabs) {
      if (!tab.highlighted) {
        continue;
      }
      focusedTabs.push(tab.id);
    }

    // To support detaching multiple tabs, we create a window using the first
    // tab highlighted, then move any extra tabs into that window
    let firstTabId = focusedTabs.pop();
    chrome.windows.create({"tabId": firstTabId, "focused": true}
    ).then((newWindow) => {
      chrome.tabs.update(firstTabId, {"highlighted": true, "active": true});

      if (focusedTabs.length == 0) {
        return;
      }

      chrome.tabs.move(focusedTabs, {"windowId": newWindow.id, "index": -1});
      for (let tabId of focusedTabs) {
        chrome.tabs.update(tabId, {"highlighted": true});
      }
    }).catch(error => {
      console.log("Unable to create new window:", error);
    });
  }).catch(error => {
    console.log("Unable to query windows:", error);
  });
}

/**
 * Helper function to return which direction is 90 degrees clockwise from the
 * supplied direction.
 */
function clockwise(direction) {
  switch (direction) {
    case Directions.UP:
      return Directions.RIGHT;
    case Directions.DOWN:
      return Directions.LEFT;
    case Directions.LEFT:
      return Directions.UP;
    case Directions.RIGHT:
      return Directions.DOWN;
    default:
      console.log("Unsupported direction:", direction);
  }
}

/**
 * Checks if the second window is in the direction specified from the point of
 * view of the first window. If checkRotated is specified (which it is by
 * default), and the two windows have the same edge in the direction specified
 * (e.g. for Directions.RIGHT, they have the same right edge), then we will
 * check to see if secondWindow is in the clockwise direction from the point of
 * view of the first. This design decision allows us cycle though multiple
 * stacked windows without having to change which attach shortcut is being
 * used.
 */
function windowInOrder(firstWindow, secondWindow, direction, checkRotated = true) {
  let firstEdge, secondEdge;
  switch (direction) {
    case Directions.UP:
      firstEdge = firstWindow.top;
      secondEdge = secondWindow.top;
      break;
    case Directions.DOWN:
      firstEdge = firstWindow.top + firstWindow.height;
      secondEdge = secondWindow.top + secondWindow.height;
      break;
    case Directions.LEFT:
      firstEdge = firstWindow.left;
      secondEdge = secondWindow.left;
      break;
    case Directions.RIGHT:
      firstEdge = firstWindow.left + firstWindow.width;
      secondEdge = secondWindow.left + secondWindow.width;
      break;
    default:
      console.log("Unsupported direction:", direction);
  }

  if (firstEdge == secondEdge) {
    return checkRotated && windowInOrder(firstWindow, secondWindow, clockwise(direction), false);
  }

  switch (direction) {
    case Directions.UP:
    case Directions.LEFT:
      return firstEdge > secondEdge;
    case Directions.DOWN:
    case Directions.RIGHT:
      return firstEdge < secondEdge;
    default:
      console.log("Unsupported direction:", direction);
  }
}

/**
 * Get all of the selected tabs from the currently focused window, and attach
 * them to the next window over in the direction specified. If no window is
 * found in the specified direction, then no change is made.
 * @param {Directions} direction - The direction to look for the next window
 */
function attach(direction) {
  Promise.all([chrome.windows.getLastFocused({"populate": true}), chrome.windows.getAll({})]
  ).then(([focusedWindow, allWindows]) => {
    let nextWindow = null;
    for (let currentWindow of allWindows) {
      if (currentWindow.id == focusedWindow.id || !windowInOrder(focusedWindow, currentWindow, direction)) {
        continue;
      }

      if (nextWindow == null) {
        nextWindow = currentWindow;
        continue;
      }

      if (windowInOrder(nextWindow, currentWindow, direction)) {
        continue;
      }
      nextWindow = currentWindow;
    }

    if (nextWindow == null) {
      console.log("No windows found in direction:", direction);
      return;
    }

    // Collect focused tabs from the current window
    let focusedTabs = [];
    for (let tab of focusedWindow.tabs) {
      if (!tab.highlighted) {
        continue;
      }
      focusedTabs.push(tab.id);
    }

    // Move the tabs to the end of the next Window
    chrome.tabs.move(focusedTabs, {"windowId": nextWindow.id, "index": -1});

    // Setting a tab as active resets the selection, so we only set the first moved tab as active
    let isFirst = true;
    for (let tabId of focusedTabs) {
      // Make sure it's highlighted and active in the new window
      chrome.tabs.update(tabId, {"highlighted": true, "active": isFirst});
      isFirst = false;
    }

    // Move the focus to the new window
    chrome.windows.update(nextWindow.id, {"focused": true});
  }).catch(error => {
    console.log("Unable to query windows:", error);
  });
}
