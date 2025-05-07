const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();
const multer = require("multer");



// books REST apis
router.get("/favourites", (req, resp) => {
	db.query("SELECT DISTINCT favourite FROM quote", (err, results) => {
		if (err) return resp.send(apiError(err));
		const categories = results.map((obj) => obj.category);
		resp.send(apiSuccess(categories));
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
			if (results.length === 0) resp.send(apiError("Book not found"));
			else resp.send(apiSuccess(results[0]));
		}
	);
});

router.get("/bycategory/:category", (req, resp) => {
	db.query(
		"SELECT * FROM quote WHERE category=?",
		[req.params.category],
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
		"UPDATE books SET  author=?, contents=?, userId=?, createdTime=? WHERE id=?",
		[ author, contents, userId, createdTime, req.params.id],
		(err, result) => {
			if (err) return resp.send(apiError(err));
			resp.send(apiSuccess({ id: req.params.id, ...req.body }));
		}
	);
});

module.exports = router;
