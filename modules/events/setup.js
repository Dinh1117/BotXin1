module.exports.config = {
    name: "setup",
    eventType: [""],
    version: "1.0.0",
    credits: "Mirai Team",
    description: "setup auto random join/leave",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = async function() {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    ///////////////join Noti start
    const pathJoin = resolve(__dirname, "cache/joinNoti");
    if (!existsSync(pathJoin)) mkdirSync(pathJoin, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join2.mp4'))) await downloadFile("https://drive.google.com/uc?export=download&id=1Gv0L-hWgt0mvrhZ7qQnlNq3VsobfQ-tq", resolve(__dirname, 'cache/joinNoti', 'join2.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join1.mp4'))) await downloadFile("https://drive.google.com/uc?export=download&id=1W08bMkyX6IyDulJGdnYonPYIKb5JlPDn", resolve(__dirname, 'cache/joinNoti', 'join1.mp4'));

    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join3.mp4'))) await downloadFile("https://drive.google.com/uc?export=download&id=1Fl62KPQYM3p_3xBSu2kjLP5fylvHVkbd", resolve(__dirname, 'cache/joinNoti', 'join3.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join4.mp4'))) await downloadFile("https://drive.google.com/uc?export=download&id=1V1M_RynitPcjLH6r68jRiObZO9p7sL6F", resolve(__dirname, 'cache/joinNoti', 'join4.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinNoti', 'join5.mp4'))) await downloadFile("https://drive.google.com/uc?export=download&id=1GAUSzF-UqygXAdEhS-3V_RpMvmk8HMud", resolve(__dirname, 'cache/joinNoti', 'join5.mp4'));
    ///////////////join Noti end

    ///////////////leave Noti start
    const pathLeave = resolve(__dirname, "cache/leaveNoti");
    if (!existsSync(pathLeave)) mkdirSync(pathLeave, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'))) await downloadFile("https://drive.google.com/uc?export=download&id=1ptXZy5ttlht6UqdXl1an7_4lV1y3FGp_", resolve(__dirname, 'cache/leaveNoti', 'leave1.gif'));
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'))) await downloadFile("https://drive.google.com/uc?export=download&id=1DNLTMEEsiHw-11KRzgfIglOhdV_D42rz", resolve(__dirname, 'cache/leaveNoti', 'leave2.gif'));
    if (!existsSync(resolve(__dirname, 'cache/leaveNoti', 'leave3.gif'))) await downloadFile("https://drive.google.com/uc?export=download&id=1ps0LgK7imLl8OZnRh0cYM5TzPBCDNQQR", resolve(__dirname, 'cache/leaveNoti', 'leave3.gif'));
    ///////////////leave Noti end

    return;
}

module.exports.run = async function({}) {}
