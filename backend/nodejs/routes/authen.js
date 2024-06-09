import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log(req.headers);
	console.log(req.socket.remoteAddress);
	console.log(req.session.user, "authen with", req.session.id);
	if (req.session.user) return res.send(true);
	else return res.send(false);
});

export default router;
