module.exports.config = {
  name: "fbavt",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Convert by ManhG",
  description: "Xem ảnh avt của user/thread",
  commandCategory: "info",
  usages: "[user/box]",
  cooldowns: 3,
  dependencies: {
    "request": "",
    "fs": ""
  }
};
module.exports.run = async ({ api, event, args }) => {
  const fs = global.nodemodule["fs-extra"];
  var TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const request = global.nodemodule["request"];
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args.length == 0) return api.sendMessage(`⚡️Bạn có thể dùng:\n\n${prefix}${this.config.name} user => nó sẽ lấy avt của chính bạn.\n\n${prefix}${this.config.name} user @[Tag] => nó sẽ lấy avt người bạn tag.\n\n${prefix}${this.config.name} box => nó sẽ lấy avt box của bạn\n\n${prefix}${this.config.name} user box tid] nó sẽ lấy avt của tid`, event.threadID, event.messageID);
  if ((args[0] == "box") || (args[0] == "-t")) {
    if (args[1]) {
      let threadInfo = await api.getThreadInfo(args[1]);
      let imgg = threadInfo.imageSrc;
      if (!imgg) api.sendMessage(`⚡️Avata của box ${threadInfo.threadName} đây`, event.threadID, event.messageID);
      else var callback = () => api.sendMessage({ body: `⚡️Avata box ${threadInfo.threadName} đây`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
    }

    let threadInfo = await api.getThreadInfo(event.threadID);
    let img = threadInfo.imageSrc;
    if (!img) api.sendMessage(`⚡️Avata của box ${threadInfo.threadName} đây`, event.threadID, event.messageID)
    else var callback = () => api.sendMessage({ body: `⚡️Avata của box ${threadInfo.threadName} đây`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
    return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };

  if ((args[0] == "user") || (args[0] == "-u")) {
    if (!args[1]) {
      if (event.type == "message_reply") id = event.messageReply.senderID
      else id = event.senderID;
      let data = await api.getUserInfo(id);
      let name = await data[id].name;
      var callback = () => api.sendMessage({ body: `⚡️Avata của bạn đây`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
      return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=${TOKEN}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
    } else {
      if (args.join().indexOf('@') !== -1) {
        var mentions = Object.keys(event.mentions)
        let data = await api.getUserInfo(mentions);
        let name = await data[mentions].name;
        var callback = () => api.sendMessage({ body: `⚡️Avata của ${name} đây`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
        return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=${TOKEN}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
      } else {
        let data = await api.getUserInfo(args[1]);
        let name = await data[args[1]].name;
        var callback = () => api.sendMessage({ body: `⚡️Avata của ${name} đây`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
        return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?height=720&width=720&access_token=${TOKEN}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
      }
    }
  }
}