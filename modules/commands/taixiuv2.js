module.exports.config = {
    name: "taixiuv2",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "DuyVuongUwU",
    description: "tài xỉu nhưng nó là nhiều người??",
    commandCategory: "Game",
    usages: "[new/leave]",
    cooldowns: 5
  };
  
  module.exports.handleEvent = async function({ api, event, Currencies }) {
    const { threadID, messageID, body, senderID } = event;
    const typ = ['tài', 'xỉu'];
    const random = typ[Math.floor(Math.random() * typ.length)];  
    if (!body) return;
    if (body.toLowerCase() == 'tài' || body.toLowerCase() == 'xỉu') {
      const gameThread = global.taixiuS.get(threadID) || {};
      if (!gameThread) return;
      else {
        if (!gameThread.player.find(i => i.userID == senderID)) return;
        else {
          var s, q;
          var s = gameThread.player.findIndex(i => i.userID == senderID);
          var q = gameThread.player[s];
          if (q.choose.status == true) return api.sendMessage('⚠ Bạn đã chọn rồi không thể chọn lại!', threadID, messageID);
          else {
            const fs = require('fs-extra');
            const axios = require('axios');
            if (body.toLowerCase() == 'tài') {
              gameThread.player.splice(s, 1);
              gameThread.player.push({ name: q.name, userID: senderID, choose: { status: true, msg: 'tài' } });
              api.sendMessage('👤 Người chơi ' + q.name + ' đã chọn TÀI!!', threadID, messageID);
            }
            else {
              gameThread.player.splice(s, 1);
              gameThread.player.push({ name: q.name, userID: senderID, choose: { status: true, msg: 'xỉu' } });
              api.sendMessage('👤 Người chơi ' + q.name + ' đã chọn XỈU!!', threadID, messageID);
            }
            var vv = 0,
                vvv = gameThread.player.length;
            for (var c of gameThread.player) {
              if (c.choose.status == true) vv++;
            }
            if (vv == vvv) {
              api.sendMessage('🥳Đang lắc....', threadID, (err, data) => {
                if (err) return api.sendMessage(err, threadID, messageID);
                setTimeout(async function () {
                  api.unsendMessage(data.messageID);
                    var ketqua = random
                    var win = [];
                    var lose = [];
                    if (ketqua.indexOf('tài') == 0) {
                      for (var i of gameThread.player) {
                        if (i.choose.msg == 'tài') {
                          win.push({ name: i.name, userID: i.userID });
                        }
                        else {
                          lose.push({ name: i.name, userID: i.userID });
                        }
                      }
                    }
                    else {
                      for (var i of gameThread.player) {
                        if (i.choose.msg == 'xỉu') {
                          win.push({ name: i.name, userID: i.userID });
                        }
                        else {
                          lose.push({ name: i.name, userID: i.userID });
                        }
                      }
                    }
                    var msg = '💎 KẾT QUẢ  ' + ketqua.toUpperCase() + '\n🥳 Những người chiến thắng:\n';
                    var dem_win = 0;
                    var dem_lose = 0;
                    for (var w of win) {
                      await Currencies.increaseMoney(w.userID, parseInt(gameThread.money * 3));
                      dem_win++;
                      msg += dem_win + '. ' + w.name + ' (' + w.userID + ')\n';
                    }
                    for (var l of lose) {
                      await Currencies.decreaseMoney(l.userID, parseInt(gameThread.money));
                      if (dem_lose == 0) {
                        msg += '\n🥺 Những người thua trong ván này:\n';
                      }
                      dem_lose++;
                      msg += dem_lose + '. ' + l.name + ' (' + l.userID + ')\n';
                    }
                    msg += '\n\n🎁Cộng tiền và trừ tiền :\n';
                    msg += '🎁 Những người thắng nhận được [ ' + (gameThread.money * 3) + '$ ]\n';
                    msg += '💰 Những người thua bị trừ [' + gameThread.money + '$ ]';
                    return api.sendMessage(msg, threadID);
                }, 5000);
              });
            }
            else return;
          }
        }
      }
    }
  }
  module.exports.run = async function({ api, event, args, Threads, Users, Currencies }) {
    try {
      if (!global.taixiuS) global.taixiuS = new Map();
  
      const { threadID, messageID, senderID } = event;
      var gameThread = global.taixiuS.get(threadID);
  
      if (args[0] == 'create' || args[0] == 'new' || args[0] == '-c') {
        if (!args[1] || isNaN(args[1])) return api.sendMessage('⚠ Số tiền cược không phải là một con số hơp lệ!', threadID, messageID);
        if (parseInt(args[1]) < 50) return api.sendMessage('⚠ Số tiền cược phải lớn hơn hoặc bằng 50$!!', threadID, messageID);
        var check = await checkMoney(senderID, args[1]);
        if (check == false) return api.sendMessage('⚠ Bạn không có đủ ' + args[1] + '$ để tạo bàn game mới!!', threadID, messageID);
        if (global.taixiuS.has(threadID)) return api.sendMessage('⚠ Nhóm này đã được mở bàn game!', threadID, messageID);
        var name = await Users.getNameUser(senderID);
        global.taixiuS.set(threadID, { box: threadID, start: false, author: senderID, player: [{ name, userID: senderID, choose: { status: false, msg: null } }], money: parseInt(args[1]) });
        return api.sendMessage('🥳 Đã tạo thành công bàn chơi game!\n=> Số tiền cược: ' + parseInt(args[1]) + '$\n=> Số thành viên tham gia: 1 thành viên\n=> Nếu muốn kết thúc bàn game vui lòng ghi ' + global.config['PREFIX'] + this.config.name + ' end\n=> Tham gia nhóm game này vui lòng ghi ' + global.config['PREFIX'] + this.config.name + ' join', threadID);
      }
      else if (args[0] == 'join' || args[0] == '-j') {
        if (!global.taixiuS.has(threadID)) return api.sendMessage('⚠ Nhóm này hiện chưa có bàn game nào!\n=> Vui lòng hãy tạo bàn game mới để tham gia!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('⚠ Hiện tại bàn game này đã được bắt đầu trước khi bạn tham gia nên bạn không thể tham gia bàn game này sau khi những người khác chơi xong!', threadID, messageID);
        var check = await checkMoney(senderID, gameThread.money);
        if (check == false) return api.sendMessage('⚠ Bạn không có đủ ' + gameThread.money + '$ để tham gia bàn game này!', threadID, messageID);
        if (gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('⚠ Hiện tại bạn đã tham gia bàn game này!', threadID, messageID);
        var name = await Users.getNameUser(senderID);
        gameThread.player.push({ name, userID: senderID, choose: { stats: false, msg: null } });
        global.taixiuS.set(threadID, gameThread);
        return api.sendMessage('🥳 Bạn đã tham gia bàn game!\n=> Số thành viên hiện tại là ' + gameThread.player.length + ' thành viên', threadID, messageID);
      }
      else if (args[0] == 'leave' || args[0] == '-l') {
        if (!global.taixiuS.has(threadID)) return api.sendMessage('⚠ Hiện tại không có bàn game nào để rời!', threadID, messageID);
        if (!gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('⚠ Bạn đã không có trong bàn game để rời!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('⚠ Bàn game đã được bắt đầu không thể rời!', threadID, messageID);
        if (gameThread.author == senderID) {
          global.taixiuS.delete(threadID);
          var name = await Users.getNameUser(senderID);
          return api.sendMessage('🥺 ' + name + ' đã rời khỏi bàn game, bàn game của nhóm đã được giải tán!', threadID, messageID);
        }
        else {
          gameThread.player.splice(gameThread.player.findIndex(i => i.userID == senderID), 1);
          global.taixiuS.set(threadID, gameThread);
          var name = await Users.getNameUser(senderID);
          api.sendMessage('🥺 Bạn đã rời khỏi bàn game của nhóm!', threadID, messageID);
          return api.sendMessage('🥺 ' + name + ' đã rời khỏi bàn game!\n=> Hiện tại bàn game còn ' + gameThread.player.length + ' thành viên', threadID);
        }
      }
      else if (args[0] == 'start' || args[0] == '-s') {
        if (!gameThread) return api.sendMessage('⚠ Hiện tại nhóm này chưa có bàn game nào!', threadID, messageID);
        if (gameThread.author != senderID) return api.sendMessage('⚠ Bạn không phải là người tạo ra bàn game này nên không thể bắt đầu game', threadID, messageID);
        if (gameThread.player.length <= 1) return api.sendMessage('⚠ Bàn game của bạn không có đủ thành viên để có thể bắt đầu!!!', threadID, messageID);
        if (gameThread.start == true) return api.sendMessage('⚠ Bàn game của bạn đã được bắt đầu từ trước', threadID, messageID);
        gameThread.start = true;
        global.taixiuS.set(threadID, gameThread);
        return api.sendMessage('🔊 GAME START: \n-> Xin mời ' + gameThread.player.length + ' người chơi nhắn "tài" hoặc "xỉu"(Lưu ý: nhắn ở trong group này không nhắn trong group khác!!!)', threadID);
      }
      else if (args[0] == 'end' || args[0] == '-e') {
        if (!gameThread) return api.sendMessage('⚠ Hiện tại nhóm này chưa có bàn game nào!', threadID, messageID);
        if (gameThread.author != senderID) return api.sendMessage('⚠ Bạn không phải là người tạo ra bàn game nên không thể xóa bàn game', threadID, messageID);
        global.taixiuS.delete(threadID);
        return api.sendMessage('🎆 Đã xóa bàn game!', threadID, messageID);
      }
      else {
        return api.sendMessage("⚠ BODY:\n- Create/new/-c: Tạo bàn chơi tài xỉu\n- Join/-j: Tham gia vào bàn tài xỉu\n- Leave/-l: Rời khỏi bàn tài xỉu\n- Start/-s: Bắt đầu bàn tài xỉu\n- End/-e: Kết thúc bàn tài xỉu", threadID, messageID);
      }
    }
    catch (err) {
      return api.sendMessage('⚠ ERROR MODULE TAIXIU: ' + err, event.threadID, event.messageID);
    }
    async function checkMoney(senderID, maxMoney) {
      var i, w;
      i = (await Currencies.getData(senderID)) || {};
      w = i.money || 0
      if (w < parseInt(maxMoney)) return false;
      else return true;
    }
  }