main= [
    [{
        text:"Поиск материалов",
        callback_data: "find_page"
    }], 
    [{
        text:"Список команд",
        callback_data: "help"
    }],
    [{
        text:"Анимации",
        callback_data: "listAnimation"
    }],
    [{
        text:"Задания",
        callback_data: "taskList"
    }]
]



module.exports = {
    listCommand : {
        reply_markup: JSON.stringify({
            
            inline_keyboard: [
                [{
                    text: 'Посмотреть список команд',
                    callback_data: "help",
                }],
            ],
        },
        ),
        
        
    },
    
    optsFindBook : {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Попробовать еще раз',
                    callback_data: 'find_page'
                }],
                [{
                    text: 'Вернуться назад',
                    callback_data: 'find_back'  
                }]
            ],
        
        },
    },

    

    mainOpts:{
        reply_markup:{
            inline_keyboard:
            [...main]
        },
    },
    
    mainMenu:{
        reply_markup: {
            inline_keyboard:
            [...main]
        },
    },

    returnMain:{
        reply_markup: {
            inline_keyboard:
            [
                [{
                    text:"Назад",
                    callback_data: "returnMain"
                }]
            ]
        },
    },
    
}

