const {bot} = require("./botConfig");
const {getIngoPage} = require("./parser")
const {optsFindBook,listCommand} = require('./option')


module.exports = {

    commandHelp: function (chatId) {
        return bot.sendMessage(chatId, `Существуют такие команды:\n
1) /start - перезапустить бота\n
2) /help - твой помощник!\n
3) /find_page - поиск книг\n
        `)
    },

    commandStart: async function (chatId, name) {
        await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp`)
        return bot.sendMessage(chatId, `${name}, Добро пожаловать, воспользуйтесь коммандой /help`, listCommand)
    },


    findBook: async function (chatId) {
        bot.on('message', msg => {
            let bookName = msg.text;
            const encoded = encodeURI(bookName);
            const url = `https://limbook.net/search/?query=${encoded}`
            console.log("Ссылка: "+url)
            return getIngoPage(url).then(t => 
                {
                t = t.filter(item=>{
                    if(item.description !="") return true;
                })

                if (t.length == 0) {
                    return bot.sendMessage(chatId, "⛔️ Ничего не найдено.", optsFindBook)
                }
                let descriptionList = []
                for (let i = 0; i < t.length; i++) {
                    t[i].description = (i + 1) + '. ' + t[i].description;
                    descriptionList.push(`${t[i].description}   /  ${t[i].author}`)
                }
                return bot.sendMessage(chatId, `👀📚 Найдены следующие книги:\n\n\n` + descriptionList.join("\n"))
            })
        })
      
        
    }
}