module.exports.config = {
    name: "nganhang",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Ngân hàng Bot global",
    commandCategory: "Economy",
    usages: "[]",
    cooldowns: 0
};
module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { senderID, messageID, threadID } = event;
    const axios = require('axios');
    const checkBank = (await axios.get(`https://api.kadeeruwu.repl.co/bank/check?ID=${senderID}`)).data  
    switch(args[0]) {
        case 'register':
        case '-r':
        case 'r': {
            const res = (await axios.get(`https://API.kadeeruwu.repl.co/bank/register?senderID=${senderID}&name=${encodeURI((await Users.getData(senderID)).name)}`)).data
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage('Mật khẩu Bank của bạn là: ' + res.message.password, senderID);
            return api.sendMessage(`Message: ${res.message.noti}\nName: ${res.message.name}\nSTK: ${res.message.STK}\nMoney: ${res.message.money}$\nPassword: đã được gửi đến tin nhắn riêng tư (nếu không nhận được vui lòng addfr bot và đặt lại mật khẩu)`, threadID, messageID)
        }
        case 'find':
        case '-f': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            const typ = ['STK', 'ID', 'name']
            if(typ.includes(args[1]) == false || !args[1]) return api.sendMessage('Vui lòng chọn đúng kiểu dữ liệu cần tìm kiếm: STK, ID, name [stk/id/name]', threadID, messageID);
            var name = args.join(" ").split(`name `).pop()
            const res = (await axios.get(`https://API.kadeeruwu.repl.co/bank/find?type=${args[1]}&${args[1]}=${args[2]}`)).data  
            if(args[1] == 'name') {
                const ress = (await axios.get(`https://API.kadeeruwu.repl.co/bank/find?type=${args[1]}&${args[1]}=${encodeURI(name)}`)).data  
                var user = 'KẾT QUẢ TÌM KIẾM\n', ii = 1;
                for(let i of ress.message.data) {
                    user += `${ii++}. ${i.name}\nSTK: ${i.data.STK}\nMoney: ${i.data.money}$\nNợ: ${i.data.debt}$\n=============\n`
                }
                return api.sendMessage(user, threadID, messageID);
            }
            return api.sendMessage(`Name: ${res.message.name}\nSTK: ${res.message.data.STK}\nMoney: ${res.message.data.money}$\nNợ: ${res.message.data.debt}$`, threadID, messageID)
        }
        case 'get':
        case 'rút': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            if(!args[1]) return api.sendMessage('Vui lòng nhập: get [số tiền]', threadID, messageID);
            api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);
            return api.sendMessage('Vui lòng nhập mật khẩu Mirai Bank để hoàn tất chuyển tiền!', senderID, (error, info) => 
                global.client.handleReply.push({
                    name: this.config.name,
                    type: 'getMoney',
                    messageID: info.messageID,
                    author: event.senderID,
                    money: args[1],
                    threadID: threadID
                })
            );
        }
        case 'pay':
        case '-p': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            if(!args[1] || !args[2] || !args[3]) return api.sendMessage('Vui lòng nhập đúng kiểu dữ liệu: pay stk [stk người nhận] [số tiền]', threadID, messageID);
            if(args[1] == 'stk') {
                api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);
                return api.sendMessage('Vui lòng nhập mật khẩu Mirai Bank để hoàn tất chuyển tiền!', senderID, (error, info) => 
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: 'paySTK',
                        messageID: info.messageID,
                        author: event.senderID,
                        STK: args[2],
                        money: args[3],
                        threadID: threadID
                    })
                );
            }
            if(args[1] == 'id') {
                if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
                api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);
                return api.sendMessage('Vui lòng nhập mật khẩu Mirai Bank để hoàn tất chuyển tiền!', senderID, (error, info) => 
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: 'payID',
                        messageID: info.messageID,
                        author: event.senderID,
                        ID: args[2],
                        money: args[3],
                        threadID: threadID
                    })
                );
            }
            break;
        }
        case 'send':
        case 'nạp': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            if(!args[1]) return api.sendMessage('Vui lòng nhập số tiền cần nạp vào!\nsend [số tiền cần nạp]', threadID, messageID);
            var check = await checkMoney(senderID, args[1])
            if (check == false) return api.sendMessage('Hmm, tiền đâu mà nạp vô đây?', threadID, messageID);
            await Currencies.decreaseMoney(senderID, parseInt(args[1]))
            const res = (await axios.get(`https://api.kadeeruwu.repl.co/bank/send?senderID=${senderID}&money=${args[1]}`)).data  
            return api.sendMessage('Nạp thành công!' + `\nSố dư hiện tại trên bank: ${res.message.money}$`, threadID, messageID)
            break;
        }
        case 'top': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            const res = (await axios.get(`https://api.kadeeruwu.repl.co/bank/top`)).data  
            if(res.status == false) return api.sendMessage('Hiện tại chưa có dữ liệu!', threadID, messageID);
            var msg = res.message + '\n'
            for (let i of res.ranking) {
                msg += `${i.rank}. ${i.name} - ${i.money}$\n===========\n`
            }
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'password':
        case 'pw': {
            if(checkBank.status == false) return api.sendMessage('Bạn chưa có tài khoản trên mirai bank!', threadID, messageID);
            var type = args[1];
            switch(type) {
                case 'get': {
                    const res = (await axios.get(`https://api.kadeeruwu.repl.co/bank/password?bka=${type}&dka=${senderID}`)).data 
                    api.sendMessage('Mật khẩu của bạn được gửi đến tin nhắn chờ', threadID, messageID);
                    return api.sendMessage(`Mật khẩu của bạn là: ${res.message.password}`, senderID);
                }
                case 'recovery':
                case 'new': {
                    api.sendMessage('Hoàn tất bước cuối cùng ở tin nhắn chờ', threadID, messageID);
                    return api.sendMessage('Vui lòng reply tin nhắn này để nhập mật khẩu mới!', senderID, (error, info) => 
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: 'newPassword',
                            messageID: info.messageID,
                            author: event.senderID,
                            threadID: threadID
                        })
                    );
                }
                default: {
                    return api.sendMessage("PW GET/NEW", threadID, messageID);
                }
            }
        }
        default: {
            return api.sendMessage("REGISTER/FIND/GET/PAY/SEND/TOP/PW", threadID, messageID);
        }
    }
async function checkMoney(senderID, maxMoney) {
    var i, w;
    i = (await Currencies.getData(senderID)) || {};
    w = i.money || 0
    if (w < parseInt(maxMoney)) return false;
    else return true;
  }
}
module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
    const axios = require('axios')
    const { senderID, messageID, threadID , body } = event;
    switch(handleReply.type) {
        case 'paySTK': {
            const res = (await axios.get(`https://API.kadeeruwu.repl.co/bank/pay?type=STK&senderID=${senderID}&STK=${handleReply.STK}&money=${handleReply.money}&password=${body}`)).data 
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`Trạng thái: ${res.message.noti}\n${res.message.data.message}`, threadID, messageID);
            return api.sendMessage(`Trạng thái: ${res.message.noti}\n${res.message.data.message}`, handleReply.threadID);
        }
        case 'payID': {
            const res = (await axios.get(`https://API.kadeeruwu.repl.co/bank/pay?type=ID&senderID=${senderID}&userID=${handleReply.ID}&money=${handleReply.money}&password=${body}`)).data 
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`Trạng thái: ${res.message.noti}\n${res.message.data.message}`, threadID, messageID);
            return api.sendMessage(`Trạng thái: ${res.message.noti}\n${res.message.data.message}`, handleReply.threadID);
        }
        case 'getMoney': {
            const res = (await axios.get(`https://API.kadeeruwu.repl.co/bank/get?ID=${senderID}&money=${handleReply.money}&password=${body}`)).data  
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            await Currencies.increaseMoney(senderID, parseInt(handleReply.money))
            api.sendMessage(`Trạng thái: ${res.message.noti}\nChủ tài khoản: ${res.message.name}\nSố dư còn lại: ${res.message.money}`, threadID, messageID);
            return api.sendMessage(`Trạng thái: ${res.message.noti}\nChủ tài khoản: ${res.message.name}\nSố dư còn lại: ${res.message.money}`, handleReply.threadID);
        }
        case 'newPassword': {
            const res = (await axios.get(`https://api.kadeeruwu.repl.co/bank/password?bka=recovery&dka=${senderID}&fka=${body}`)).data  
            if(res.status == false) return api.sendMessage(res.message, threadID, messageID);
            api.sendMessage(`Trạng thái: ${res.message.noti}\nChủ tài khoản: ${res.message.name}`, handleReply.threadID);
            return api.sendMessage(`Thay đổi mật khẩu thành công!\nMật khẩu hiện tại: ${res.message.password}`, threadID, messageID)
        }
    }
              }