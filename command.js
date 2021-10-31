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






// let flag=false;

module.exports = {

    commandHelp: function (chatId) {
        return bot.sendMessage(chatId, `Существуют такие команды:\n
1) /start - перезапустить бота\n
2) /help - твой помощник!\n
3) /find_page - поиск книг\n
        `, returnMain)
    },

    commandStart: async function (chatId, name) {
        
        bot.sendMessage(chatId, `${name}, Добро пожаловать`, mainOpts)
    },


    findBook: function (chatId) {
        // bot.removeTextListener(/(.+)/)

        // bot.removeListener('message')
        bot.removeListener('message')

        bot.once('message', async msg => {
            // bot.removeTextListener(/(.+)/)
            // if(flag){
            //     return flag;
            // }


            console.log('test findBook: ')

            // flag = true;
            const maxPage = await getFindBook(msg.text, msg.from.id)

            if (maxPage) {
                setQuestion(chatId, async data => {
                    // flag = false;
                    console.log("Max: " + maxPage)
                    await bot.sendMessage(chatId, "MaxPage: " + maxPage)
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