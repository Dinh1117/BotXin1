module.exports.config = {
    name: "fbget",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "tải video từ fb",
    commandCategory: "media",
    usages: "[link]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, utils  })  {
const axios = global.nodemodule['axios'];  
const fs = global.nodemodule["fs-extra"];
if (!args[0]){ return api.sendMessage("⚡Bạn phải ngập url video facebook !", event.threadID, event.messageID);}
const link = args.join(" ");
let mystr = `${link}`;
try {
const res = await axios.get(`https://manhict.tech/fbvideo/v2?url=${mystr}&apikey=mzkVip_VUCHIENTHANG`);
const data = res.data.data
const link = data.medias[1].url;
console.log(link)
    path1 = __dirname+`/cache/${event.senderID}.mp4`  
    const getms = (await axios.get(link,{responseType: "arraybuffer"})).data; 
      fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
      
    if (fs.statSync(__dirname + `/cache/${event.senderID}.mp4`).size > 26000000) return api.sendMessage('⚡Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.mp4`), event.messageID);
    else return api.sendMessage({body : "" , attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.mp4`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.mp4`), event.messageID)
} catch {
            return api.sendMessage('⚡Không thể xử lý yêu cầu của bạn!', event.threadID, event.messageID);
        }
}