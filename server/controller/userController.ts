import expressAsyncHandler from "express-async-handler";

const home = expressAsyncHandler(async (req, res) => {
  res.send("Some Data With Authorization");
});

export { home };
