const express = require("express");

const CryptoCtrl = require("../controllers/crypto-ctrl");

const router = express.Router();

// router.post("/crypto", CryptoCtrl.createCrypto);
router.post("/selected", CryptoCtrl.selectCoin);
router.post("/remove", CryptoCtrl.removeCoin);
router.get("/search/:searchinput", CryptoCtrl.CryptoList);
router.get("/getcoins", CryptoCtrl.getSelectedCoins);
router.get("/getsinglecoin", CryptoCtrl.getSingleCoin);

module.exports = router;
