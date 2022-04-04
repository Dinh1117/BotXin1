module.exports.config = {
	name: "finduid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Tiadals",
	description: "",
	commandCategory: "Group",
	usages: "",
	cooldowns: 0
};

module.exports.run = function ({
	event,
	args,
	api,
	getText
}) {
	var typeuid = args[0];
	if (!typeuid) return api.sendMessage(`Vui lòng nhập url cần lấy uid!`, event.threadID, event.messageID);
	else {
		const axios = require('axios');
		axios.get(`https://manhict.tech/finduid?url=${typeuid}&apikey=mzkVip_VUCHIENTHANG`).then(res => {
			return api.sendMessage(`${res.data.id}`, event.threadID, event.messageID);
		});
	}
}
