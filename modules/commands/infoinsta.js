module.exports.config = {
	name: "infoinsta",
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
let user = args.join(" ");
const res = await axios.get(`https://le31.glitch.me/instagram/info?username=${user}`);
var name = res.data.name;
var bio = res.data.bio;
var post = res.data.posted;
var follower = res.data.followers;
var following = res.data.following;
var img = res.data.avatar;

if (!user) return api.sendMessage("Bạn chưa nhập id insta ", event.threadID, event.messageID);



var callback = () => api.sendMessage({body:`\nTên đầy đủ: ${name}\nTiểu Sử:${bio}\nBài Viết: ${post}\nNgười Theo Dõi: ${follower}\nĐang Theo Dõi: ${following}`,attachment: fs.createReadStream(__dirname + "/cache/infoins.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ins.png"),event.messageID);

  return request(`${res.data.avatar}`).pipe(fs.createWriteStream(__dirname+'/cache/infoins.png')).on('close',() => callback());     

}