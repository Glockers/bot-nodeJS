const fs = require("fs");
const cheerio = require('cheerio');
const request = require('request');

async function getPage(url){

    return new Promise((resolve, reject)=>{
        request({
            url: url,
            headers:{
               'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
            }
        },(error, response,body)=>{
            if(error){
                return reject(error);
            }
            return resolve(cheerio.load(body))
        })
    })
}





module.exports = {
    getIngoPage: async function (url){
        let result= [];
        const $ = await getPage(url)
        let last_page = await $('ul[class=pagination]>li:nth-child(11)>a').attr('href')
        if(last_page){
            last_page= last_page.replace(/\D*/, "")
            for(let i=1; i<=last_page;i++){
                const $$ = await getPage(`https://limbook.net/books/page/${i}`)
                const ads = $$('h2[class="book-description__title"]>a').each((i, elem)=>{

                    
                })
                console.log(`${i}/${last_page}`)
            }
        }else{
        
        
        const ads = await $('div[class=book-list__content]>div').each(i=>{
            result.push({
               'description' : $(`body > div > div > main > section > div > div:nth-child(${i+1}) > div > h2>a`).text().trim("\n"),
                'url' : "https://limbook.net"+ $(`body > div > div > main > section > div > div:nth-child(${i+1}) > div > h2 > a`).attr('href'),
                'author': $(`body > div > div > main > section > div > div:nth-child(${i+1}) > div > div>a`).text().trim("\n")
            })
        })
    }
        fs.writeFile("test.json", JSON.stringify(result), 'utf8', (err) => {
            if (err) console.log(err); // если возникла ошибка    
            else console.log("Данные записаны в файл parser.js");
          })
        return await result;
    }
}

