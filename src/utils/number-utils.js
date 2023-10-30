export const numberWithComma = (val, decimalPlaces = false) => {
  if (typeof val === "string") {
    val = parseInt(val);
  }
  const options = { minimumFractionDigits: 0 };
  if (decimalPlaces) {
    options.maximumFractionDigits = 2;
  }
  return val.toLocaleString("en-IN", options);
};

export const numberWithCommaINR = (val, decimalPlaces = false) => {
  if (typeof val === "string") {
    val = parseFloat(val);
  }
  const options = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  };
  if (decimalPlaces) {
    options.maximumFractionDigits = 2;
  }
  return val.toLocaleString("en-IN", options);
};
