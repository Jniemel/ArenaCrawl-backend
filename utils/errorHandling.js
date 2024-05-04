// handle validation errors
export const handleValErr = (res, errs) => {
  const arr = errs.array();
  console.error(arr);
  return res.status(422).json({ errors: arr });
};

// handle catch errors
export const handleCatchErr = (res, err) => {
  console.error(err.message, err.code);
  return res.status(400).json({ errors: err });
};
