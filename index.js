const {
    bot
} = require("./botConfig");
const {
    commandHelp,
    commandStart,
    findBook
} = require("./command");




bot.setMyCommands([{
        command: "/start",
        description: "Запустить приложение"
    },
    {
        command: "/help",
        description: "Помощник"
    },
    {
        command: "/find_page",
        description: "Помощник"
    },
])

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    commandStart(chatId, msg.from.first_name)
})

bot.onText(/\/help/, msg => {
    const chatId = msg.chat.id;
    commandHelp(chatId)
})

bot.onText(/\/find_page/, data => {
    const chatId = data.chat.id;
    bot.sendMessage(chatId, "Введи название книги")
    findBook(chatId)
})
bot.onText(/\/anim (.+)/, (msg, match) => {
    let text = match[0].replace("/anim ", '');
    let chatID = msg.chat.id;
    let text2 = "";
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    bot.sendMessage(chatID, "З").then(value => {
        (async function(){
        for(let el of text){
            text2+=el
            
            bot.editMessageText(text2+"▒", {
                chat_id: chatID,
                message_id: value.message_id,
            })
            await sleep(400)
        }
        await bot.editMessageText("Готово!☑️", {
            chat_id: chatID,
            message_id: value.message_id,
        })
    })()
        
    })
})

bot.on('message_auto_delete_timer_changed', msg => {
    bot.sendMessage(msg.chat.id, `Автоудаление сообщений установлено на ${msg.message_auto_delete_timer_changed. message_auto_delete_time/3600/24} день/дней`);
})



bot.on('callback_query', data => {
    const {
        message: {
            message_id,
            chat
        }
    } = data;



    bot.editMessageReplyMarkup({
        inline_keyboard: []
    }, {
        chat_id: data.from.id,
        message_id: data.message.message_id
    })



    if (data.data == 'find_page') {
        bot.editMessageText("Введи название книги", {
            chat_id: data.message.chat.id,
            message_id: data.message.message_id,
        })
        findBook(chat.id)

    } else if (data.data == 'find_back') {
        commandHelp(chat.id);
    } else if (data.data == 'help') {

        commandHelp(chat.id)
    }

    bot.answerCallbackQuery(
        callback_query_id = data.id);
})
bot.on('polling_error', (error) => {
    console.log(error.code); // => 'EFATAL'
});

removeHisKeyboard = function (callbackQuery) {
    bot.editMessageText(callbackQuery.message.text,

        {
            message_id: callbackQuery.message.message_id,
            chat_id: callbackQuery.from.id,
            reply_markup: {
                remove_keyboard: true
            }
        }).catch((err) => {
        //some error handling
    }).then(function (res) {
        if (res)
            addThisChatToHandledList(callbackQuery.from.id)
    })

}