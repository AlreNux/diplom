import { getCallResult } from "./formulaB";
// find D(r,a)
export const placementProbability = (callResult, lines, traffic) => {
  return (lines * callResult) / (lines - traffic * (1 - callResult));
};

// find W(r,a)
export const waitingTimeInLine = (placementProbabilityResult, traffic, time) => {
  return (placementProbabilityResult * time) / (traffic + 1 - traffic);
};

// queue = Dnorm; average = Wnorm; intensity = λ; time = 1/µ
export const getMinAgentsCount = ({ queue, average, intensity, time }) => {
  const q = Number(queue);
  const a = Number(average);
  const traffic = (intensity * time) / 3600;
  let lines = 1;
  let result = {
    0: [0, 2, 2, traffic],
  };

  while (!(result[lines - 1][1] <= q && result[lines - 1][2] <= a)) {
    const callResult = getCallResult({ lines, traffic });
    const valuePreLines = Object.values(callResult);
    const lastValuePreLines = valuePreLines[valuePreLines.length - 1];

    const placementProbabilityResult = placementProbability(lastValuePreLines, lines, traffic);
    const waitingTimeInLineResult = waitingTimeInLine(placementProbabilityResult, traffic, time);
    result = {
      ...result,
      [lines]: [lastValuePreLines.toFixed(10), placementProbabilityResult.toFixed(10), waitingTimeInLineResult.toFixed(10), traffic],
    };
    lines++;
  }

  delete result[0];
  return result;
};
