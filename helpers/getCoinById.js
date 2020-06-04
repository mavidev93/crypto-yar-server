const axios = require("axios");

const getCoinById = async (id) => {
  return (await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`)).data;
};

module.exports = getCoinById;
