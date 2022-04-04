module.exports.config = {
	name: "chanle",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Horizon",
	description: "chanle [chẵn/lẻ] [Tiền]",
	commandCategory: "game-sp",
	usages: "như trên",
	cooldowns: 0
};
function isEven(n) {
    return n % 2 == 0;
}

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  );
}
function isOdd(n) {
    if (isEven(n)) {
        return false;
    } else {
        return true;
    }
}
module.exports.run = async function ({ api,event,Users,Currencies,args }) {
    const moneyUser = (await Currencies.getData(event.senderID)).money;
    var random = between(1,11);
        var answer;
            switch(isOdd(parseInt(random))) {
                case true: answer = "lẻ";
                    break;
                case false: answer = "chẵn";
                    break;
                default: return api.sendMessage("[𝐇𝐋🌟] => Lỗi !",event.threadID);
            }
            if (!args[0]) return api.sendMessage("[𝐇𝐋🌟] => Bấm !chanle [Chẵn/Lẻ] [ Số Tiền ]",event.threadID);
            var moneyBet = parseInt(args[1]);
            if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("Số tiền đặt cược không được để trống", event.threadID, event.messageID);
        if (moneyBet > moneyUser) return api.sendMessage("Số tiền bạn đặt lớn hơn số dư của bạn!", event.threadID, event.messageID);
    if (moneyBet < 50) return api.sendMessage("Số tiền đặt không được dưới 50 đô!", event.threadID, event.messageID);
        var option;
            switch (args[0].toLowerCase()) {
                case "chẵn": option = "chẵn";
                    break;
                case "lẻ": option = "lẻ";
                    break;
                default: return api.sendMessage("[𝐇𝐋🌟] => Bấm !chanle [Chẵn/Lẻ] [ Số Tiền ]",event.threadID);    
            }
        if (isNaN(args[1])) return api.sendMessage("[𝐇𝐋🌟] => Hãy Nhập Số Tiền !",event.threadID);
    try {
        if (answer == option) {
            var resault = parseInt(args[1]) * 2;
            await Currencies.increaseMoney(event.senderID, resault);
            return api.sendMessage("[𝐇𝐋🌟] => Bạn Đã Thắng Với Kết Quả Là : " + random + " " + answer.toUpperCase() + " \n Số Tiền Bạn Nhận Được Là: " + resault,event.threadID,event.messageID);
        }
        else {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1]));
            return api.sendMessage("[𝐇𝐋🌟] => Bạn Đã Thua Với Kết Quả Là : " + random + " " + answer.toUpperCase() + " \n Số Tiền Bạn Mất Là: " + parseInt(args[1]),event.threadID,event.messageID);
        }
        }
    catch (e) {
        console.log(e);
    }
};