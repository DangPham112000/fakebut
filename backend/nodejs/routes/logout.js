export default (req, res, next) => {
  req.session.user = null;
  req.session.save((err) => {
    if (err) return next(err);
    req.session.regenerate(function (err) {
      if (err) return next(err);
      res.redirect("/login");
    });
  });
};
