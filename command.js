const {
    bot
} = require("./botConfig");
const {
    getIngoPage
} = require("./parser")
const {
    optsFindBook,
    listCommand,
    mainOpts,
    returnMain
} = require('./option')
const fs = require("fs")



let opts = {
    reply_markup: {
        inline_keyboard: [

        ]
    }
}

function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}



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


    findBook: async function (chatId) {
        bot.on('message', msg => {
            bot.removeListener("message")
            let bookName = msg.text;
            const encoded = encodeURI(bookName);
            const url = `https://limbook.net/search/?query=${encoded}`
            console.log("Ссылка: " + url)
            return getIngoPage(url).then(t => {
                t = t.filter(item => {
                    if (item.description != "") return true;
                })

                if (t.length == 0) {
                    return bot.sendMessage(chatId, "⛔️ Ничего не найдено.", optsFindBook)
                }
                let descriptionList = []
                for (let i = 0; i < t.length; i++) {
                    t[i].description = (i + 1) + '. ' + t[i].description;
                    descriptionList.push(`${t[i].description}   /  ${t[i].author}`)
                }
                bot.sendMessage(chatId, `👀📚 Найдены следующие книги:\n\n\n` + descriptionList.join("\n"))
                let array = paginate(descriptionList, 2, 1)

                return;
            })
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