module.exports.config = {
	name: "sdtphongthuy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Tiadals",
	description: "",
	commandCategory: "Other",
	usages: "",
	cooldowns: 0
};

module.exports.run = function ({
	event,
	args,
	api,
	getText
}) {
	var typeuid = args.join(" ");
	if (!typeuid) return api.sendMessage(`Vui lòng nhập số điện thoại`, event.threadID, event.messageID);
	else {
		const axios = require('axios');
		axios.get(`http://le31.glitch.me/other/sdtphongthuy?number=${typeuid}`).then(res => {
			return api.sendMessage(`Bốn số cuối: ${res.data.bonsoduoi} \n ${res.data.ynghia} \n ${res.data.ketluan}`, event.threadID, event.messageID);
		});
	}
}
