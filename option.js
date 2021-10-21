module.exports = {
    listCommand : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    text: 'Посмотреть список команд',
                    callback_data: "help"
                }],
            ],
            
        }),
        
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
        }
    }
}