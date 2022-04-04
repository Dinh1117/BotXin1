module.exports.config = {
    name: "cosplay",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Bố Thịnh",
    description: "Ảnh Cossplay",
    commandCategory: "18+",
    usages: "",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];

    var data = await Currencies.getData(event.senderID);
    var money = data.money;
    const mention = Object.keys(event.mentions);
    if (!mention[0]) return api.sendMessage("Vui lòng tag 1 người.", event.threadID, event.messageID);
    else if (money < 666) return api.sendMessage("Bạn cần 666 đô để sử dụng lệnh này!", event.threadID, event.messageID);
    Currencies.setData(event.senderID, options = { money: money - 969 })
    axios.get('https://imgs-api.herokuapp.com/japcosplay?apikey=mk001').then(res => {
        let ext = res.data.data.response.url.substring(res.data.data.response.url.lastIndexOf(".") + 1);
        let callback = function() {
            api.sendMessage({
                body: `-666 Đô`,
                attachment: fs.createReadStream(__dirname + `/cache/1.${ext}`)
            }, event.threadID, (err, info) => setTimeout(() => api.unsendMessage(info.messageID), 10000), event.messageID, () => fs.unlinkSync(__dirname + `/cache/1.${ext}`), event.messageID);
        };
        request(res.data.data.response.url).pipe(fs.createWriteStream(__dirname + `/cache/1.${ext}`)).on("close", callback);
    })
}