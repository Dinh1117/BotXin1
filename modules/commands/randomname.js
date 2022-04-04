module.exports.config = {
    name: "randomname",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "HTHB",
    description: "Kho Ảnh của NEKOS",
    commandCategory: "nsfw",
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
  case "peru": {
        type = "peru";
        break;
    }
    case "brazil": {
        type = "brazil";
        break;
    }  
case "italy": {
        type = "italy";
        break;
    } 
case "china": {
        type = "china";
        break;
    }  
case "singapore": {
        type = "singapore";
        break;
    } 
case "japan": {
        type = "japan";
        break;
    }
    case "india": {
        type = "bangladesh";
        break;
    }
    case "france": {
        type = "france";
        break;
    }
    case "russia": {
        type = "russia";
        break;
    }
    case "vietnam": {
        type = "vietnam";
        break;
    } 
     case "us": {
        type = "us";
        break;
    }
    case "philippin": {
        type = "philippines";
        break;
    }
    default:
    return api.sendMessage(`Sai tên quốc gia hoặc chữ viết hoa/thường \nCác quốc gia hiện có: vietnam, brazil, italy, china, singapore, japan, india, france, russia, peru, us, philippin`, threadID, messageID);
    break;
  }
  axios.get(`https://le31.glitch.me/other/randomname/${type}`).then(res => {
    return api.sendMessage(`Tên ngẫu nhiên của bạn là : ${res.data.name}`, event.threadID, event.messageID);
   });
}
