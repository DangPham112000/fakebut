export default (req, res, next) => {
  console.log("auth req.session.user", req.session.user);
  if (req.session.user) return next();
  else {
    console.log("session expried");
    res.send({ notAuth: true });
    // next("route");
  }
};
