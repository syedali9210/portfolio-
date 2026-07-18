// Cubic-bezier timing function (same math as CSS's cubic-bezier(x1,y1,x2,y2)
// and the gre/bezier-easing algorithm) so JS-driven animations that only take
// a plain (t: number) => number — like Lenis's smooth-scroll `easing` option —
// can share the exact curve used elsewhere on the site (Framer Motion, CSS).
const NEWTON_ITERATIONS = 4;
const NEWTON_MIN_SLOPE = 0.001;
const SUBDIVISION_PRECISION = 0.0000001;
const SUBDIVISION_MAX_ITERATIONS = 10;
const SPLINE_TABLE_SIZE = 11;
const SAMPLE_STEP_SIZE = 1 / (SPLINE_TABLE_SIZE - 1);

function A(a1: number, a2: number) {
  return 1 - 3 * a2 + 3 * a1;
}
function B(a1: number, a2: number) {
  return 3 * a2 - 6 * a1;
}
function C(a1: number) {
  return 3 * a1;
}

function calcBezier(t: number, a1: number, a2: number) {
  return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
}
function getSlope(t: number, a1: number, a2: number) {
  return 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1);
}

export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  if (x1 === y1 && x2 === y2) return (t: number) => t;

  const sampleValues = new Float32Array(SPLINE_TABLE_SIZE);
  for (let i = 0; i < SPLINE_TABLE_SIZE; i++) {
    sampleValues[i] = calcBezier(i * SAMPLE_STEP_SIZE, x1, x2);
  }

  function getTForX(x: number) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = SPLINE_TABLE_SIZE - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= x; currentSample++) {
      intervalStart += SAMPLE_STEP_SIZE;
    }
    currentSample--;

    const dist =
      (x - sampleValues[currentSample]) /
      (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    let guessForT = intervalStart + dist * SAMPLE_STEP_SIZE;

    const initialSlope = getSlope(guessForT, x1, x2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      for (let i = 0; i < NEWTON_ITERATIONS; i++) {
        const currentSlope = getSlope(guessForT, x1, x2);
        if (currentSlope === 0) return guessForT;
        const currentX = calcBezier(guessForT, x1, x2) - x;
        guessForT -= currentX / currentSlope;
      }
      return guessForT;
    }
    if (initialSlope === 0) return guessForT;

    let aA = intervalStart;
    let aB = intervalStart + SAMPLE_STEP_SIZE;
    let currentX: number;
    let currentT: number;
    let iterations = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, x1, x2) - x;
      if (currentX > 0) aB = currentT;
      else aA = currentT;
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++iterations < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  return function bezierEasing(x: number) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return calcBezier(getTForX(x), y1, y2);
  };
}
