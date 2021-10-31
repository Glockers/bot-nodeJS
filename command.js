const {
    bot
} = require("./botConfig");

const {
    optsFindBook,
    listCommand,
    mainOpts,
    returnMain
} = require('./option')
const {
    setQuestion,
    getFindBook
} = require('./modules/findBook')







module.exports = {

    commandHelp: function (chatId) {
        return bot.sendMessage(chatId, `Существуют такие команды:\n
1) /start - перезапустить бота\n
2) /help - твой помощник!\n
3) /find_page - поиск книг\n
        `, returnMain)
    },

    commandStart: async function (chatId, name) {
        return bot.sendMessage(chatId, `${name}, Добро пожаловать`, mainOpts)
    },


    findBook: function (chatId) {
        bot.on('message', async msg => {
            bot.removeListener("message")
            const maxPage = await getFindBook(msg.text, msg.from.id)

            if (maxPage) {
                setQuestion(chatId, async data => {
                    console.log("Max: " + maxPage)
                    await bot.sendMessage(chatId, "MaxPage: " + maxPage)
                    console.log(data)
                    bot.sendMessage(chatId, `${msg.from.first_name}, Добро пожаловать`, mainOpts)
                })
            }


        })
    },

    checkFunc: async function (chatID, callBack) {
        bot.sendMessage(chatID, "Вопрос1: ")
        bot.on("message", msg => {
            bot.removeListener("message")
            callBack({
                text: msg.text,
                from: msg.from.id
            })
        })
    }

}