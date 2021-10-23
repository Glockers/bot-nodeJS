const fs = require("fs");
const cheerio = require('cheerio');
const request = require('request');
const unzipper = require('unzipper');
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

async function getFileBook(url){
    const $ = await getPage(url);
    url = "https://limbook.net"+$("a.download-links__icon.download-links__icon--fb2").attr("href").trim("");
    return Promise.resolve(request(url).pipe(fs.createWriteStream('buffer.zip')));
     console.log("1")

}
function unzipFile(){
    return Promise.resolve(fs.createReadStream('buffer.zip').pipe(unzipper.Extract({ path: 'files' })));
     console.log("2")

}
function deleteFileBook(){
    let nameFile = "buffer.zip"

    return Promise.resolve(fs.unlink(nameFile, (err)=>{
        if (err) console.log("Возникла ошибка 2"); // если возникла ошибка  
        else console.log(`${nameFile} was deleted`);
    }))
}


// (async function(){
//     try{
//     await getFileBook('https://limbook.net/book/istochnik.html');
//     await unzipFile();
//     await deleteFileBook();
//     }
//     catch(err){console.log("Ошибка 4")}
// })()



     




module.exports = {
    // getFileBook: async function(url){
    //     const $ = await getPage(url)
    //     url = "https://limbook.net"+$("a.download-links__icon.download-links__icon--fb2").attr("href").trim("")
    //     return request(url).pipe(fs.createWriteStream('doodle.zip'))
    // },


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
        
        return await result;
    }
}

