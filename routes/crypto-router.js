const express = require("express");

const CryptoCtrl = require("../controllers/crypto-ctrl");

const router = express.Router();

// router.post("/crypto", CryptoCtrl.createCrypto);
router.post("/crypto/selected", CryptoCtrl.selectCoin);
router.post("/crypto/remove", CryptoCtrl.removeCoin);
router.get("/crypto/search/:searchinput", CryptoCtrl.CryptoList);
router.get("/crypto/getcoins", CryptoCtrl.getSelectedCoins);
router.get("/crypto/getsinglecoin", CryptoCtrl.getSingleCoin);

module.exports = router;
