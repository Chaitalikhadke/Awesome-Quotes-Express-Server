const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();


// common prefix -- /quotes


router.get("/author", (req, resp) => {
	db.query("SELECT DISTINCT author FROM quote", (err, results) => {
		if (err) return resp.send(apiError(err));
		const authores = results.map((obj) => obj.author);
		resp.send(apiSuccess(authores));
	});
});

router.get("", (req, resp) => {
	db.query("SELECT * FROM quote", (err, results) => {
		if (err) return resp.send(apiError(err));
		resp.send(apiSuccess(results));
	});
});

router.get("/:id", (req, resp) => {
	db.query(
		"SELECT * FROM quote WHERE id=?",
		[req.params.id],
		(err, results) => {
			if (err) return resp.send(apiError(err));
			if (results.length === 0) resp.send(apiError("Quote not found"));
			else resp.send(apiSuccess(results[0]));
		}
	);
});

router.get("/byauthor/:author", (req, resp) => {
	db.query(
		"SELECT * FROM quote WHERE author=?",
		[req.params.author],
		(err, results) => {
			if (err) return resp.send(apiError(err));
			else resp.send(apiSuccess(results));
		}
	);
});

router.delete("/:id", (req, resp) => {
	db.query("DELETE FROM quote WHERE id=?", [req.params.id], (err, result) => {
		if (err) return resp.send(err);
		if (result.affectedRows === 1) resp.send(apiSuccess("Book deleted"));
		else resp.send(apiError("Quote not found"));
	});
});

router.put("/:id", (req, resp) => {
	const { author, contents, userId, createdTime } = req.body;
	db.query(
		"UPDATE quote SET  author=?, contents=?, userId=?, createdTime=? WHERE id=?",
		[ author, contents, userId, createdTime, req.params.id],
		(err, result) => {
			if (err) return resp.send(apiError(err));
			resp.send(apiSuccess({ id: req.params.id, ...req.body }));
		}
	);
});

module.exports = router;
