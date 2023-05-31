export const getCallResult = ({ lines, traffic }) => {
  const l = Number(lines);
  const t = Number(traffic);

  let limit = 0;
  let result = {
    0: 1,
  };

  while (limit < l) {
    limit++;
    const prevValue = t * result[limit - 1];
    result = { ...result, [limit]: prevValue / (limit + prevValue) };
  }

  return result;
};

export const getLinesResult = ({ call, traffic }) => {
  let lines = 1;
  let result = {
    0: 1,
  };

  while (!(result[lines - 1] <= call)) {
    const preLines = getCallResult({ lines, traffic });
    const valuePreLines = Object.values(preLines);
    const lastValuePreLines = valuePreLines[valuePreLines.length - 1];
    result = { ...result, [lines]: (traffic * lastValuePreLines) / (lines + 1 + traffic * lastValuePreLines) };
    lines++;
  }

  return result;
};

export const getTrafficResult = ({ lines, call }) => {
  const c = Number(call);

  let traffic = 0;
  let lastValuePreLines = 0;

  let result = {
    0: 1,
  };

  while (lastValuePreLines < c) {
    const preLines = getCallResult({ lines, traffic });
    const valuePreLines = Object.values(preLines);
    lastValuePreLines = valuePreLines[valuePreLines.length - 1];
    result = { ...result, [traffic]: Number(lastValuePreLines) };
    traffic++;
  }

  return result;
};
