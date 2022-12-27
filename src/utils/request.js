export function formatedErrorsArray(err) {
  const errorObject = err?.response?.data?.errors;
  if (err?.response?.status == 500) {
    return ["internal error!"];
  }
  if (errorObject) {
    return Object.entries(errorObject).map((value) => {
      return value.join(" ");
    });
  } else {
    return err;
  }
}
