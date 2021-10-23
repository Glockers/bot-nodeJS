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
                bot.removeListener("message")
                return bot.sendMessage(chatId, `👀📚 Найдены следующие книги:\n\n\n` + descriptionList.join("\n"))
            })
        })
    },
    checkFunc: async function (chatID) {
        var a;
       bot.on("message", msg => {
            bot.removeListener("message")
            fs.writeFile("test.json", JSON.stringify(msg.text), 'utf8', (err) => {
                if (err) console.log(err); // если возникла ошибка    
                else console.log("Данные записаны в файл test.json");
            })
        })
        console.log(a) // underfined

    }
}