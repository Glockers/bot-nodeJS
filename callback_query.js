const {
    mainMenu,
    returnMain
} = require('./option')
const {
    bot
} = require("./botConfig");


module.exports = {
    startMenu: async function (data) {
        let chatId = data?.message?.chat.id || data.chat.id
        let message_id = data?.message?.message_id || data.message_id
        // edit Message
        await bot.editMessageText(`${data.from.first_name}, Добро пожаловать!`, {
            chat_id: chatId,
            message_id: message_id
        })
        // EDIT INLINE
        await bot.editMessageReplyMarkup({
            inline_keyboard: [...mainMenu.reply_markup.inline_keyboard]
        }, {
            chat_id: chatId,
            message_id: message_id
        })
        // END
    },

    startHelp: async function (data) {
        let text = `Существуют такие команды:\n
        1) /start - перезапустить бота\n
        2) /help - твой помощник!\n
        3) /find_page - поиск книг\n`


        await bot.editMessageText(text, {
            chat_id: data.message.chat.id,
            message_id: data.message.message_id,
        })

        await bot.editMessageReplyMarkup({
            inline_keyboard: [...returnMain.reply_markup.inline_keyboard]
        }, {
            chat_id: data.from.id,
            message_id: data.message.message_id
        })

    },

    repeatFind: async function () {

    },

}