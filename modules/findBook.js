const {
    getIngoPage
} = require('../parser')


const {
    optsFindBook,
    listCommand,
    mainOpts,
    returnMain
} = require('../option')

const {
    bot
} = require("../botConfig");

module.exports = {
    setQuestion: async function (ChatId, callback) {

        await bot.sendMessage(ChatId, 'Выберите пункт: ')
        // bot.removeListener('message')
        
        await bot.once('message', msg => {
            // bot.removeListener('message')

            console.log('module не найден')
            callback(msg);
        })
    },

    getFindBook: function (bookName, chatId) {

        const encoded = encodeURI(bookName);
        const url = `https://limbook.net/search/?query=${encoded}`
        console.log("Ссылка: " + url)

        return getIngoPage(url).then(t => {

            t = t.filter(item => {
                if (item.description != "") return true;
            })

            if (t.length == 0) {
                bot.sendMessage(chatId, "⛔️ Ничего не найдено.", optsFindBook)
                return false;
            }

            let descriptionList = []
            for (let i = 0; i < t.length; i++) {
                t[i].description = (i + 1) + '. ' + t[i].description;
                descriptionList.push(`${t[i].description}   /  ${t[i].author}`)
            }
            bot.sendMessage(chatId, `👀📚 Найдены следующие книги:\n\n\n` + descriptionList.join("\n"))

            return t.length;
        })
    }


}