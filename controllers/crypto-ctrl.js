const axios = require("axios");
const User = require("../models/user-model");
const getCoinById = require("../helpers/getCoinById");

const CryptoList = async (req, res) => {
  const val = req.params.searchinput;
  let url;
  url =
    val !== "empty"
      ? `https://api.coinpaprika.com/v1/search/?q=${val}`
      : "https://api.coinpaprika.com/v1/coins";
  const list = (await axios.get(url)).data;
  if (!list) {
    return res.status(404).json("somthing is wrong");
  }
  res.status(201).json(list);
};

const getSelectedCoins = async (req, res) => {
  if (req.user) {
    const { selectedCoinsId } = req.user;
    let selectedCoins = [];

    for (const coinId of selectedCoinsId) {
      const coin = await getCoinById(coinId);
      selectedCoins.push(coin);
    }
    res.send(selectedCoins);
  } else {
    res.redirect("/auth/google");
  }
};

const selectCoin = async (req, res) => {
  const coinId = req.body.coinId;
  if (req.user) {
    if (!coinId) {
      return res.status(404).send("nothing found");
    }
    const id = req.user.id;

    const curUser = await User.findById(id);
    if (curUser.selectedCoinsId.every((id) => id !== coinId)) {
      let newSelectedCoinsId = curUser.selectedCoinsId
        ? curUser.selectedCoinsId
        : [];
      newSelectedCoinsId.push(coinId);

      let newUser = await User.findOneAndUpdate(
        { _id: id },
        { selectedCoinsId: newSelectedCoinsId }
      );
      if (newUser) {
        return res.send(`${coinId} added`);
      } else {
        return res.send("somthing wrong");
      }
    } else {
      return res.send("this coin already selected");
    }
  } else {
    const newCoin = await getCoinById(coinId);
    return res.json(newCoin);
  }
};

const getSingleCoin = async (req, res) => {
  const id = req.query.id;
  try {
    const coin = await getCoinById(id);
    res.json(coin);
  } catch {
    res.status(400).send("somthing went wrong");
  }
};

const removeCoin = async (req, res) => {
  if (req.user) {
    const id = req.body.coinId;
    const newSelecteedCoinsId = req.user.selectedCoinsId.filter(
      (coinId) => coinId !== id
    );
    const curUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { selectedCoinsId: newSelecteedCoinsId }
    );

    if (curUser) {
      res.send(`coin removed`);
    } else {
      res.send("somthing wrong");
    }
  }
};

module.exports = {
  CryptoList,
  selectCoin,
  getSelectedCoins,
  removeCoin,
  getSingleCoin,
};
