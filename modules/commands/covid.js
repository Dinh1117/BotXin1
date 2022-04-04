module.exports.config = {
	name: "covid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu mod by Tidals",
	description: "",
	commandCategory: "Other",
	usages: "",
	cooldowns: 5,
	dependencies: {"request" : ""}
};

module.exports.run = async ({ api, event,args }) => {
const request = require('request');
  const fs = require("fs-extra")
  const axios = require("axios")
let quocgia = args.join(" ");
const res = await axios.get(`https://api-ttk.herokuapp.com/other/covid?country=${quocgia}`);
var quocgia = res.data.country;
var tuvong = res.data.chet;
var dieutri = res.data.dieutri;
var danso = res.data.danso;
var chauluc = res.data.chauluc;
var img = res.data.image;

if (!quocgia) return api.sendMessage("Bạn chưa nhập quốc gia ", event.threadID, event.messageID);



var callback = () => api.sendMessage({body:`\nQuốc gia: ${quocgia}\nĐiều trị: ${dieutri}\nTử vong: ${tuvong}\nDân số: ${danso}\nChâu lục: ${chauluc}`,attachment: fs.createReadStream(__dirname + "/cache/infoins.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ins.png"),event.messageID);

  return request(`${res.data.image}`).pipe(fs.createWriteStream(__dirname+'/cache/infoins.png')).on('close',() => callback());     

}