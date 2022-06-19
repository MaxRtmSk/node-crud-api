export const isArrayOfStrings = (array: []): boolean => {
  if (typeof array !== "undefined" && array.length === 0) {
    return true;
  }

  if (
    typeof array !== "undefined" &&
    typeof array !== "string" &&
    array.length > 0
  ) {
    return array.every((element) => {
      return typeof element === "string";
    });
  }

  return false;
};
