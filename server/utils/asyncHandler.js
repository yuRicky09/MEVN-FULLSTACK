export const asyncHandler = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch((err) => {
      console.log("Error!", err);
      res.status(400).json({ msg: err.message });
    });
  };
};
