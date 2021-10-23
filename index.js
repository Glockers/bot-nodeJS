const {
    bot
} = require("./botConfig");
const {
    commandHelp,
    commandStart,
    findBook,
    checkFunc
} = require("./command");

const {
    showLoad,
    sleep,
    showAnimationText
} = require("./animation");
const {
    startMenu,
    startHelp,
    repeatFind,
} = require("./callback_query")

bot.getMe().then(me => {

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
            description: "Найтри книгу"
        },
        {
            command: "/anim", // посмотреть
            description: "Анимация текста)"
        },
    ])

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        // bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp`);
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
    // Анимация текста
    bot.onText(/\/anim (.+)/, (msg, match) => {
        let chatID = msg.chat.id;

        showAnimationText(chatID, match[0]);
    })
    bot.onText(/\/test/, (msg, match) => {
        let chatID = msg.chat.id;
        checkFunc(chatID)
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

       
        if (data.data == 'find_page') {
            bot.editMessageText("Введи название книги", {
                chat_id: data.message.chat.id,
                message_id: data.message.message_id,
            })
            findBook(chat.id)

        } else if (data.data == 'find_back') {
            commandHelp(chat.id);
        } else if (data.data == 'help') {
            startHelp(data);
        } else if (data.data == 'returnMain') {
            startMenu(data)
        }

        bot.answerCallbackQuery(callback_query_id = data.id);
    })
    bot.on('polling_error', (error) => {
        console.log(error.code); // => 'EFATAL'
    });
})