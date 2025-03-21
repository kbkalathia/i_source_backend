export const toBoolean = (value: string) => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  }
  return undefined;
};

export const toInteger = (value: string | number) => {
  if (typeof value === "number") {
    return value;
  } else if (value === "string") {
    return Number(value);
  }

  return undefined;
};
