const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
        if (err) return res.status(400).send(err);

        // 프론트에 숫자정보를 보내주기
        return res.status(200).json({ success: true, favoriteNumber: info.length });
    });
});

router.post("/favorited", (req, res) => {
    // 내가 영화를 Favorite 리스트에 넣었는지 DB에서 가져오기

    Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, info) => {
        if (err) return res.status(400).send(err);

        let result = false;
        if (info.length !== 0) {
            result = true;
        }

        return res.status(200).json({ success: true, favorited: result });
    });
});

router.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc });
    });
});

router.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
        (err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, doc });
        }
    );
});

router.post("/getFavoritedMovie", (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, favorites });
    });
});

module.exports = router;
