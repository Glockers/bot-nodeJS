const {
    bot
} = require("./botConfig");

sleep= function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
},
module.exports = {
    showLoad: function (chatId, message) {

    },

    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    showAnimationText: function (chatID, text) {
        text = text.replace("/anim ", '');
        let text2 = "";

        bot.sendMessage(chatID, ".").then(value => {
            (async function () {
                for (let el of text) {
                    text2 += el

                    bot.editMessageText(text2 + "▒", {
                        chat_id: chatID,
                        message_id: value.message_id,
                    })
                    await sleep(400)
                }
                await bot.editMessageText("Загрузка завершена!✅", {
                    chat_id: chatID,
                    message_id: value.message_id,
                })
            })()

        })
    },

   
}