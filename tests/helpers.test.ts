import { Direction, getNextWindowId } from "../src/helpers";
import { strict as assert } from 'assert';
import { describe, test } from 'node:test';

/**
 * These properties are required for chrome.windows.Window, but not important
 * for these tests. We use this shorthand to make test data simpler.
 */
const required = {
    "focused": false,
    "alwaysOnTop": false,
    "incognito": false,
};
/**
 * Non-overlapping Test Cases
 *
 * Each of these test cases requires a well defined ordering in all directions.
 * While some orderings make less sense (e.g. Top-To-Bottom when the two
 * windows are Left-To-Right), it is possible for that configuration to exist
 * in between two other windows which *do* have a clear ordering in the desired
 * direction. In these cases, the user expects to be able to navigate in the
 * logical direction and be able to pass the windows that exist between them.
 */

describe('Non-overlapping testcase ONE', () => {
/**
 * #############
 * #     #     #
 * #  1  #  2  #
 * #     #     #
 * #############
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase TWO', () => {
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
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase THREE', () => {
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
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase FOUR', () => {
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
    "top": 0,
    "height": 40,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase FIVE', () => {
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
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase SIX', () => {
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
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase SEVEN', () => {
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
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase EIGHT', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase NINE', () => {
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
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Non-overlapping testcase TEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase ELEVEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase TWELVE', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase THIRTEEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 20,
    ...required,
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

describe('Non-overlapping testcase FOURTEEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
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

describe('Non-overlapping testcase FIFTEEN', () => {
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
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase SIXTEEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase SEVENTEEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Non-overlapping testcase EIGHTEEN', () => {
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
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window3: chrome.windows.Window = {
    "id": 3,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
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

/*
 * Overlapping Test cases
 */


describe('Overlapping testcase ONE', () => {
/**
 * /-----\
 * |     |
 * |  1/-+---\
 * |   | |   |
 * \---+-/2  |
 *     |     |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 20,
    ...required,
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

describe('Overlapping testcase TWO', () => {
/**
 * /-----\
 * |  1  |
 * +-----+---\
 * |     |   |
 * +-----/2  |
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THREE', () => {
/**
 *     /-----\
 *     |  1  |
 * /---+-----+---\
 * |   |     |   |
 * |  2\-----/2  |
 * |             |
 * \-------------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
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

describe('Overlapping testcase FOUR', () => {
/**
 *     /-----\
 *     |  1  |
 * /---+-----+
 * |   |     |
 * |  2\-----+
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase FIVE', () => {
/**
 *     /-----\
 *     |     |
 * /---+-\1  |
 * |   | |   |
 * |  2\-+---/
 * |     |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase SIX', () => {
/**
 * /---+-+---\
 * |   | |   |
 * |   | |1  |
 * |   | |   |
 * |  2\-+---/
 * |     |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase SEVEN', () => {
/**
 * /-----\
 * |     |
 * |  2/-+---\
 * |   | |   |
 * |   | |1  |
 * |   | |   |
 * |  2\-+---/
 * |     |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase EIGHT', () => {
/**
 * /-----\
 * |     |
 * |  2/-+---\
 * |   | |   |
 * |   | |1  |
 * |   | |   |
 * \---+-+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase NINE', () => {
/**
 * /---------\
 * |         |
 * |  2/-----+
 * |   |     |
 * \---+-----+
 *     |  1  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase TEN', () => {
/**
 * /-------------\
 * |             |
 * |  2/-----\2  |
 * |   |     |   |
 * \---+-----+---/
 *     |  1  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase ELEVEN', () => {
/**
 * /---------\
 * |         |
 * +-----\2  |
 * |     |   |
 * +-----+---/
 * |  1  |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase TWELVE', () => {
/**
 *     /-----\
 *     |     |
 * /---+-\2  |
 * |   | |   |
 * |  1| |   |
 * |   | |   |
 * \---+-+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTEEN', () => {
/**
 *     /-----\
 *     |     |
 * /---+-\2  |
 * |   | |   |
 * |  1| |   |
 * |   | |   |
 * \---+-/2  |
 *     |     |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 20,
    ...required,
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

describe('Overlapping testcase FOURTEEN', () => {
/**
 * /---+-+---\
 * |   | |   |
 * |  1| |   |
 * |   | |   |
 * \---+-/2  |
 *     |     |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 20,
    ...required,
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

describe('Overlapping testcase FIFTEEN', () => {
/**
 * /---+-----+
 * |   |     |
 * |  1|     |
 * |   |     |
 * \---+-----+
 *     |  2  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase SIXTEEN', () => {
/**
 *     /-----\
 *     |  2  |
 * /---+-----+
 * |   |     |
 * |  1|     |
 * |   |     |
 * \---+-----+
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase SEVENTEEN', () => {
/**
 * +-----+---\
 * |     |   |
 * |     |  1|
 * |     |   |
 * +-----+---/
 * |  2  |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
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

describe('Overlapping testcase EIGHTEEN', () => {
/**
 * /-----\
 * |  2  |
 * +-----+---\
 * |     |   |
 * |     |  1|
 * |     |   |
 * +-----+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 10,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase NINETEEN', () => {
/**
 * /-----\
 * |  2  |
 * +-----+---\
 * |     |   |
 * |     |1  |
 * |     |   |
 * +-----+---/
 * |  2  |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 10,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase TWENTY', () => {
/**
 * /---+-----+---\
 * |   |     |   |
 * |  1|     |1  |
 * |   |     |   |
 * \---+-----+---/
 *     |  2  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-ONE', () => {
/**
 *     /-----\
 *     |  2  |
 * /---+-----+---\
 * |   |     |   |
 * |  1|     |1  |
 * |   |     |   |
 * \---+-----+---/
 *     |  2  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-TWO', () => {
/**
 *     /-----\
 *     |  2  |
 * /---+-----+
 * |   |     |
 * |  1|     |
 * |   |     |
 * \---+-----+
 *     |  2  |
 *     \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 20,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-THREE', () => {
/**
 *     /-----\
 *     |  2  |
 * /---+-----+---\
 * |   |     |   |
 * |  1|     |1  |
 * |   |     |   |
 * \---+-----+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-FOUR', () => {
/**
 * /-----\
 * |  2  |
 * +-----+
 * |     |
 * |  1  |
 * |     |
 * +-----+
 * |  2  |
 * \-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 10,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase TWENTY-FIVE', () => {
/**
 * /---+-----+---\
 * |   |     |   |
 * |  1|  2  |1  |
 * |   |     |   |
 * \---+-----+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-SIX', () => {
/**
 * /-------------\
 * |             |
 * |  1/-----\1  |
 * |   |     |   |
 * |   |  2  |   |
 * |   |     |   |
 * |  1\-----/1  |
 * |             |
 * \-------------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 30,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
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

describe('Overlapping testcase TWENTY-SEVEN', () => {
/**
 * /-----+---\
 * |     |   |
 * |  1  |   |
 * |     |   |
 * +-----/2  |
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase TWENTY-EIGHT', () => {
/**
 * /---+-----+---\
 * |   |     |   |
 * |   |  1  |   |
 * |   |     |   |
 * |  2\-----/2  |
 * |             |
 * \-------------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
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

describe('Overlapping testcase TWENTY-NINE', () => {
/**
 * /---+-----\
 * |   |     |
 * |   |  1  |
 * |   |     |
 * |  2\-----+
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 0,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTY', () => {
/**
 * /---------\
 * |         |
 * |  2/-----+
 * |   |     |
 * |   |  1  |
 * |   |     |
 * |  2\-----+
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase THIRTY-ONE', () => {
/**
 * /---------\
 * |         |
 * |  2/-----+
 * |   |     |
 * |   |  1  |
 * |   |     |
 * \---+-----/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase THIRTY-TWO', () => {
/**
 * /-------------\
 * |             |
 * |  2/-----\2  |
 * |   |     |   |
 * |   |  1  |   |
 * |   |     |   |
 * \---+-----+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase THIRTY-THREE', () => {
/**
 * /---------\
 * |         |
 * +-----\2  |
 * |     |   |
 * |  1  |   |
 * |     |   |
 * \-----+---/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTY-FOUR', () => {
/**
 * /---------\
 * |         |
 * +-----\2  |
 * |     |   |
 * |  1  |   |
 * |     |   |
 * +-----/2  |
 * |         |
 * \---------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 0,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTY-FIVE', () => {
/**
 * /----------\
 * |/-----\   |
 * ||     |   |
 * ||  1  |   |
 * ||     |   |
 * |\-----/2  |
 * |          |
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 1,
    "height": 10,
    "left": 1,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTY-SIX', () => {
/**
 * /-------------\
 * |   /-----\   |
 * |   |     |   |
 * |   |  1  |   |
 * |   |     |   |
 * |  2\-----/2  |
 * |             |
 * \-------------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 1,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
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

describe('Overlapping testcase THIRTY-SEVEN', () => {
/**
 * /----------\
 * |   /-----\|
 * |   |     ||
 * |   |  1  ||
 * |   |     ||
 * |  2\-----/|
 * |          |
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 1,
    "height": 10,
    "left": 9,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase THIRTY-EIGHT', () => {
/**
 * /----------\
 * |          |
 * |  2/-----\|
 * |   |     ||
 * |   |  1  ||
 * |   |     ||
 * |  2\-----/|
 * |          |
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 9,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase THIRTY-NINE', () => {
/**
 * /----------\
 * |          |
 * |  2/-----\|
 * |   |     ||
 * |   |  1  ||
 * |   |     ||
 * |   \-----/|
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 9,
    "height": 10,
    "left": 9,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase FORTY', () => {
/**
 * /-------------\
 * |             |
 * |  2/-----\2  |
 * |   |     |   |
 * |   |  1  |   |
 * |   |     |   |
 * |   \-----/   |
 * \-------------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 9,
    "height": 10,
    "left": 10,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 30,
    ...required,
  };
  test('Left-to-Right Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.RIGHT), window1.id);
  });
  test('Right-to-Left Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.LEFT), window2.id);
  });
  test('Top-to-Bottom Ordering', () => {
    assert.equal(getNextWindowId(window2, [window1, window2], Direction.DOWN), window1.id);
  });
  test('Bottom-to-Top Ordering', () => {
    assert.equal(getNextWindowId(window1, [window1, window2], Direction.UP), window2.id);
  });
});

describe('Overlapping testcase FORTY-ONE', () => {
/**
 * /----------\
 * |          |
 * |/-----\2  |
 * ||     |   |
 * ||  1  |   |
 * ||     |   |
 * |\-----/   |
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 9,
    "height": 10,
    "left": 1,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 20,
    "left": 0,
    "width": 20,
    ...required,
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

describe('Overlapping testcase FORTY-TWO', () => {
/**
 * /----------\
 * |          |
 * |/-----\2  |
 * ||     |   |
 * ||  1  |   |
 * ||     |   |
 * |\-----/2  |
 * |          |
 * \----------/
 */
  const window1: chrome.windows.Window = {
    "id": 1,
    "top": 10,
    "height": 10,
    "left": 1,
    "width": 10,
    ...required,
  };
  const window2: chrome.windows.Window = {
    "id": 2,
    "top": 0,
    "height": 30,
    "left": 0,
    "width": 20,
    ...required,
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
