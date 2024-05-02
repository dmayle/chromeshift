/** The cardinal directions supported by this extension */
export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

interface Window {
  // We don't care about the first three properties, but they're required
  // properties of chrome.windows.Window and we can't use type predicates
  // without them.
  focused: boolean;
  alwaysOnTop: boolean;
  incognito: boolean;

  id: number,
  top: number,
  left: number,
  width: number,
  height: number,
}

function isWindow(chromeWindow: chrome.windows.Window): chromeWindow is Window {
  return chromeWindow.id !== undefined && chromeWindow.top !== undefined && chromeWindow.left !== undefined && chromeWindow.width !== undefined && chromeWindow.height !== undefined;
}

/**
 * Gets all of this extension's commands from Chrome, and checks to make sure
 * that extensions are configured
 * */
export function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts: string[] = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === '' && name !== undefined) {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      console.log("Not all shortcuts were registered!", missingShortcuts);
    }
  });
}

function getCenter(window: Window): {x: number, y: number} {
  return {x: window.left + window.width / 2, y: window.top + window.height / 2};
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
function windowsInOrder(firstWindow: Window, secondWindow: Window, direction: Direction): boolean {
  let inOrder = true;
  var firstCenter: number, secondCenter: number;
  switch (direction) {
    case Direction.LEFT:
      inOrder = false;
    case Direction.RIGHT:
      ({x: firstCenter} = getCenter(firstWindow));
      ({x: secondCenter} = getCenter(secondWindow));
      if (firstCenter < secondCenter) {
        return inOrder;
      } else if (firstCenter > secondCenter) {
        return !inOrder;
      }
      if (firstWindow.left < secondWindow.left) {
        return inOrder;
      } else if (firstWindow.left > secondWindow.left) {
        return !inOrder;
      }
      if (firstWindow.top < secondWindow.top) {
        return inOrder;
      } else if (firstWindow.top > secondWindow.top) {
        return !inOrder;
      }
      if (firstWindow.id < secondWindow.id) {
        return inOrder;
      } else if (firstWindow.id > secondWindow.id) {
        return !inOrder;
      }
      break;
    case Direction.UP:
      inOrder = false;
    case Direction.DOWN:
      ({y: firstCenter} = getCenter(firstWindow));
      ({y: secondCenter} = getCenter(secondWindow));
      if (firstCenter < secondCenter) {
        return inOrder;
      } else if (firstCenter > secondCenter) {
        return !inOrder;
      }
      if (firstWindow.top < secondWindow.top) {
        return inOrder;
      } else if (firstWindow.top > secondWindow.top) {
        return !inOrder;
      }
      if (firstWindow.left < secondWindow.left) {
        return inOrder;
      } else if (firstWindow.left > secondWindow.left) {
        return !inOrder;
      }
      if (firstWindow.id < secondWindow.id) {
        return inOrder;
      } else if (firstWindow.id > secondWindow.id) {
        return !inOrder;
      }
      break;

    default:
      break;
  }
  return false;
}


export function getNextWindowId(firstWindow: chrome.windows.Window, allWindows: chrome.windows.Window[], direction: Direction): number {
  if (!isWindow(firstWindow)) {
    throw new TypeError("getNextWindowId: First window is invalid!");
  }
  let nextWindow: Window | null = null;
  for (let currentWindow of allWindows) {
    if (!isWindow(currentWindow) || currentWindow.id == firstWindow.id) {
      continue;
    }
    if (!windowsInOrder(firstWindow, currentWindow, direction)) {
      continue;
    }
    if (nextWindow === null) {
      nextWindow = currentWindow;
      continue;
    }
    if (windowsInOrder(currentWindow, nextWindow, direction)) {
      // currentWindow is both after firstWindow and before nextWindow
      nextWindow = currentWindow;
    }
  }

  return nextWindow === null ? firstWindow.id : nextWindow.id;
}
