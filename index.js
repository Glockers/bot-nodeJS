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
    commandHelp(chatId);
})

bot.onText(/\/find_page/, data => {
    const chatId = data.chat.id;
    bot.sendMessage(chatId, "Введи название книги")
    findBook(chatId)
})

bot.on('message_auto_delete_timer_changed', msg=>{
    bot.sendMessage(msg.chat.id,`Автоудаление сообщений установлено на ${msg.message_auto_delete_timer_changed. message_auto_delete_time/3600/24} день/дней`);
})

bot.on('callback_query', data => {
    const {message: {message_id, chat}} = data;
    bot.deleteMessage(chat.id, message_id);
    
    if (data.data == 'find_page') {
        bot.sendMessage(chat.id, "Введи название книги")
        findBook(chat.id)
    }
    else if(data.data == 'find_back'){
        commandHelp(chat.id);
    }
    else if(data.data == 'help'){
        commandHelp(chat.id);
    }
    
    bot.answerCallbackQuery(
        callback_query_id = data.id,
        text = "good",
        cache_time = 0,
        remove_keyboard=true,
    )
})
bot.on('polling_error', (error) => {
    console.log(error.code); // => 'EFATAL'
});