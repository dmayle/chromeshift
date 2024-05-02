import { Direction, getNextWindowId } from "../src/helpers";
import { strict as assert } from 'assert';
import { describe, test } from 'node:test';
/**
 * Non-overalapping Test Cases
 *
 * Each of these test cases requires a well defined ordering in all directions.
 * While some orderings make less sense (e.g. Top-To-Bottom when the two
 * windows are Left-To-Right), it is possible for that configuration to exist
 * in between two other windows which *do* have a clear ordering in the desired
 * direction. In these cases, the user expects to be able to navigate in the
 * logical direction and be able to pass the windows that exist between them.
 */

describe('Testcase ONE', () => {
/**
 * #############
 * #     #     #
 * #  1  #  2  #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase TWO', () => {
/**
 *       #######
 *       #     #
 * #######  2  #
 * #     #     #
 * #  1  #######
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Testcase THREE', () => {
/**
 * #############
 * #     #     #
 * #     #  2  #
 * #  1  #     #
 * #     #######
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Testcase FOUR', () => {
/**
 * #######
 * #     #
 * #     #######
 * #     #     #
 * #  1  #  2  #
 * #     #     #
 * #     #######
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 40,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase FIVE', () => {
/**
 * #######
 * #     #
 * #     #######
 * #  1  #     #
 * #     #  2  #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase SIX', () => {
/**
 * #######
 * #     #
 * #  1  #######
 * #     #     #
 * #######  2  #
 *       #     #
 *       #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase SEVEN', () => {
/**
 *       #######
 *       #     #
 * #######     #
 * #     #     #
 * #  1  #  2  #
 * #     #     #
 * #######     #
 *       #     #
 *       #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Testcase EIGHT', () => {
/**
 * #######
 * #     #
 * #  1  #
 * #     #
 * #######
 * #     #
 * #  2  #
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase NINE', () => {
/**
 *    #######
 *    #     #
 *    #  1  #
 *    #     #
 * ##########
 * #     #
 * #  2  #
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 20,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase TEN', () => {
/**
 * ###########
 * #         #
 * #    1    #
 * #         #
 * ###########
 * #     #
 * #  2  #
 * #     #
 * #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase ELEVEN', () => {
/**
 * #############
 * #           #
 * #     1     #
 * #           #
 * #############
 *    #     #
 *    #  2  #
 *    #     #
 *    #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 30,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase TWELVE', () => {
/**
 * ###########
 * #         #
 * #    1    #
 * #         #
 * ###########
 *     #     #
 *     #  2  #
 *     #     #
 *     #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase THIRTEEN', () => {
/**
 * #######
 * #     #
 * #  1  #
 * #     #
 * ##########
 *    #     #
 *    #  2  #
 *    #     #
 *    #######
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase FOURTEEN', () => {
/**
 *    #######
 *    #     #
 *    #  1  #
 *    #     #
 * #############
 * #           #
 * #     2     #
 * #           #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 30,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.UP), window1.id);
  });
});

describe('Testcase FIFTEEN', () => {
/**
 * #############
 * #     #     #
 * #     #  2  #
 * #     #     #
 * #  1  #######
 * #     #     #
 * #     #  3  #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.RIGHT), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.RIGHT), window3.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.LEFT), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.DOWN), window1.id);
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.DOWN), window3.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.UP), window1.id);
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.UP), window2.id);
  });
});

describe('Testcase SIXTEEN', () => {
/**
 * #############
 * #     #     #
 * #  1  #     #
 * #     #     #
 * #######  3  #
 * #     #     #
 * #  2  #     #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.RIGHT), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.RIGHT), window3.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.LEFT), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.DOWN), window3.id);
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.DOWN), window2.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.UP), window3.id);
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.UP), window1.id);
  });
});

describe('Testcase SEVENTEEN', () => {
/**
 * #############
 * #           #
 * #     1     #
 * #           #
 * #############
 * #     #     #
 * #  2  #  3  #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.RIGHT), window1.id);
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.RIGHT), window3.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.LEFT), window1.id);
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.DOWN), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.DOWN), window3.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.UP), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.UP), window1.id);
  });
});

describe('Testcase EIGHTEEN', () => {
/**
 * #############
 * #     #     #
 * #  1  #  2  #
 * #     #     #
 * #############
 * #           #
 * #     3     #
 * #           #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "focused": true,
    "alwaysOnTop": false,
    "incognito": false,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.RIGHT), window3.id);
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.RIGHT), window2.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.LEFT), window3.id);
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.LEFT), window1.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2, window3], Direction.DOWN), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.DOWN), window3.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window3, [window1, window2, window3], Direction.UP), window2.id);
    assert.equal(getNextWindowId(window2, [window1, window2, window3], Direction.UP), window1.id);
  });
});
