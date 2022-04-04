module.exports.config = {
    name: "truthordare",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Tiadals",
    description: "Sự thật hoặc thử thách",
    commandCategory: "Game",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const { threadID, messageID } = event;
  var type;
  switch(args[0]) {
  case "truth": {
        type = "dare";
        break;
    }
    case "dare": {
        type = "truth";
        break;
    }  
    default:
    return api.sendMessage(`Sai định dạng , vui lòng chọn truth hoặc dare VD: ${global.config.PREFIX}truthordare truth`, threadID, messageID);
    break;
  }
  axios.get(`http://le31.glitch.me/other/truthordare/${type}/play`).then(res => {
    return api.sendMessage(`${res.data.data}`, event.threadID, event.messageID);
   });
}
