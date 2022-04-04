module.exports.config = {
    name: "setup",
    version: "1.0.3",
    hasPermssion: 2,
    credits: "ManhG",
    description: "onLoad",
    commandCategory: "config",
    usages: "",
    cooldowns: 0,
    denpendencies: {
      "fs-extra": "",
      "request": ""
    }
  };
  module.exports.onLoad = () => {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const dirMaterial = __dirname + `/Noprefix/12thi/`; //12thitienganh
  if (!fs.existsSync(dirMaterial + "Noprefix/12thi")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "12thi.jpg")) request("https://i.postimg.cc/Nf4tDQZ8/12thi.jpg").pipe(fs.createWriteStream(dirMaterial + "12thi.jpg"));
  if (!fs.existsSync(dirMaterial + "1.jpg")) request("https://i.postimg.cc/nhhJw6ty/1.png").pipe(fs.createWriteStream(dirMaterial + "1.jpg"));
  if (!fs.existsSync(dirMaterial + "2.jpg")) request("https://i.postimg.cc/nL5pmTg6/2.png").pipe(fs.createWriteStream(dirMaterial + "2.jpg"));
  if (!fs.existsSync(dirMaterial + "3.jpg")) request("https://i.postimg.cc/cJ6d6P9R/3.png").pipe(fs.createWriteStream(dirMaterial + "3.jpg"));
  if (!fs.existsSync(dirMaterial + "4.jpg")) request("https://i.postimg.cc/cLFsxdm1/4.png").pipe(fs.createWriteStream(dirMaterial + "4.jpg"));
  if (!fs.existsSync(dirMaterial + "5.jpg")) request("https://i.postimg.cc/BnSSfj2w/5.png").pipe(fs.createWriteStream(dirMaterial + "5.jpg"));
  if (!fs.existsSync(dirMaterial + "6.jpg")) request("https://i.postimg.cc/9FjX1802/6.png").pipe(fs.createWriteStream(dirMaterial + "6.jpg"));
  if (!fs.existsSync(dirMaterial + "7.jpg")) request("https://i.postimg.cc/J7X4NV1K/7.png").pipe(fs.createWriteStream(dirMaterial + "7.jpg"));
  if (!fs.existsSync(dirMaterial + "8.jpg")) request("https://i.postimg.cc/KYsvNmkp/8.png").pipe(fs.createWriteStream(dirMaterial + "8.jpg"));
  if (!fs.existsSync(dirMaterial + "9.jpg")) request("https://i.postimg.cc/4Nbf06H9/9.png").pipe(fs.createWriteStream(dirMaterial + "9.jpg"));
  if (!fs.existsSync(dirMaterial + "10.jpg")) request("https://i.postimg.cc/NGRBy64z/10.png").pipe(fs.createWriteStream(dirMaterial + "10.jpg"));
  if (!fs.existsSync(dirMaterial + "11.jpg")) request("https://i.postimg.cc/sxPrtzxr/11.png").pipe(fs.createWriteStream(dirMaterial + "11.jpg"));
  if (!fs.existsSync(dirMaterial + "12.jpg")) request("https://i.postimg.cc/brfPCrzg/12.png").pipe(fs.createWriteStream(dirMaterial + "12.jpg"));
    ////////////////
    const dirMaterial = __dirname + `/Noprefix/12congiap/`;
  if (!fs.existsSync(dirMaterial + "Noprefix/12congiap")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "12congiap.jpg")) request("https://i.postimg.cc/fbK1w1LZ/12congiap.jpg").pipe(fs.createWriteStream(dirMaterial + "12congiap.jpg"));
  if (!fs.existsSync(dirMaterial + "ti.gif")) request("https://i.postimg.cc/gJpRKBqw/ti.gif").pipe(fs.createWriteStream(dirMaterial + "ti.gif"));
  if (!fs.existsSync(dirMaterial + "suu.gif")) request("https://i.postimg.cc/dVrMhwwc/suu.gif").pipe(fs.createWriteStream(dirMaterial + "suu.gif"));
  if (!fs.existsSync(dirMaterial + "dan.gif")) request("https://i.postimg.cc/ZKLp4yvG/dan.gif").pipe(fs.createWriteStream(dirMaterial + "dan.gif"));
  if (!fs.existsSync(dirMaterial + "mao.gif")) request("https://i.postimg.cc/X7YP8sQD/mao.gif").pipe(fs.createWriteStream(dirMaterial + "mao.gif"));
  if (!fs.existsSync(dirMaterial + "thin.gif")) request("https://i.postimg.cc/bwjCFbc4/thin.gif").pipe(fs.createWriteStream(dirMaterial + "thin.gif"));
  if (!fs.existsSync(dirMaterial + "ran.gif")) request("https://i.postimg.cc/7Y59shTS/ran.gif").pipe(fs.createWriteStream(dirMaterial + "ran.gif"));
  if (!fs.existsSync(dirMaterial + "ngo.gif")) request("https://i.postimg.cc/KvmFtXkX/ngo.gif").pipe(fs.createWriteStream(dirMaterial + "ngo.gif"));
  if (!fs.existsSync(dirMaterial + "mui.gif")) request("https://i.postimg.cc/dtsZWxkd/mui.gif").pipe(fs.createWriteStream(dirMaterial + "mui.gif"));
  if (!fs.existsSync(dirMaterial + "than.gif")) request("https://i.postimg.cc/4N2SFp04/than.gif").pipe(fs.createWriteStream(dirMaterial + "than.gif"));
  if (!fs.existsSync(dirMaterial + "dau.gif")) request("https://i.postimg.cc/9MQKz1R9/dau.gif").pipe(fs.createWriteStream(dirMaterial + "dau.gif"));
  if (!fs.existsSync(dirMaterial + "tuat.gif")) request("https://i.postimg.cc/qqmX7V6f/tuat.gif").pipe(fs.createWriteStream(dirMaterial + "tuat.gif"));
  if (!fs.existsSync(dirMaterial + "hoi.gif")) request("https://i.postimg.cc/g0ZWqGGD/hoi.gif").pipe(fs.createWriteStream(dirMaterial + "hoi.gif"));
  ////////////////
  
  return;
  
  }
   
  module.exports.run = async function ({ api, event, Threads, getText }) {
    return api.sendMessage(`chỉ để load source`, event.threadID, event.messageID);
  }