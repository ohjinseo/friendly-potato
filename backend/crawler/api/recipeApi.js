const request = require("request");
const cheerio = require("cheerio");

const searchURL = "https://www.10000recipe.com/recipe/list.html?q={0}&order=reco&page={1}";
const baseURL = "https://www.10000recipe.com"

String.format = function() {
	let args = arguments;

	return args[0].replace(/{(\d+)}/g, function(match, num) {
		num = Number(num) + 1;
		return typeof(args[num]) != undefined ? args[num] : match;
    });
}

let pages = [];

module.exports.getAPI = (name, page) => {
    scope = page % 4;
    page = parseInt(page / 4) + 1;
    
    let arr = [];
    return new Promise((resolve, reject) => { 
        /*
        0 => page:1, 0-9
        1 => page:1, 10-19
        2 => page:1, 20-29
        3 => page:1, 30-39

        4 => page:2, 0-10
        ...

        8 => page:3

        12 => page:4
         */
        url = String.format(searchURL, encodeURI(name), page);

        request(url,  async (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            
            if (response.statusCode === 200) {
                const $ = cheerio.load(body);
                const recipeElementList = $(".common_sp_list_li").toArray();

                for (let i = scope * 10; i < (scope * 10) + 10; i++){
                    const item = recipeElementList[i];
                    const title = $(item).find('div.common_sp_caption > .common_sp_caption_tit.line2').text();
                    const thumbImage = $(item).find('.common_sp_thumb > .common_sp_link > img').attr('src');
                    const recipeId = $(item).find('.common_sp_thumb > a').attr('href');
                    // const ingredients = await getIngredientInfo(recipeId);
                    arr.push( {
                        title,
                        thumbImage,
                        recipeId,
                       // ingredients
                    });

                }

                resolve(arr);
            }
    
        });
    })
}


const getIngredientInfo = (recipeUrl) => {
    return new Promise(function (resolve, reject) {
        let arr2 = [];
        
        request(baseURL + recipeUrl, (error, response, body) => {
        if (error) {
            console.error(error);
            reject(error);
            return;
        }
        if (response.statusCode === 200) {
            const $ = cheerio.load(body);
            const ingredientElementList = $(".ready_ingre3 ul > li");
            ingredientElementList.each((i, item) => {
                let ingredient = $(item).find('a:nth-child(1)').text().replace(/\s/g, '').toString();
                
                if (ingredient.length === 0) {
                    ingredient = $(item).text().split(' ')[0];
                }

                ingredient.replace(/ *\([^)]*\) */g, "");
                arr2[i] = ingredient;
                
            })

            resolve(arr2);
            return;
        }      
        })
    })    
}

// module.exports.getAPI = (name, page) => {
//     let arr = [];
//     return new Promise((resolve, reject) => { 
//         url = String.format(searchURL, encodeURI(name), page);

//         request(url,  async (error, response, body) => {
//             if (error) {
//                 console.error(error);
//                 return;
//             }
            
//             if (response.statusCode === 200) {
//                 const $ = cheerio.load(body);
//                 const recipeElementList = $(".common_sp_list_li");
//                 let p = Promise.resolve();
//                 recipeElementList.each(async (i, item) => {
//                     p = p.then(async function () {
//                         const title = $(item).find('div.common_sp_caption > .common_sp_caption_tit.line2').text();
//                         const thumbImage = $(item).find('.common_sp_thumb > .common_sp_link > img').attr('src');
//                         const recipeId = $(item).find('.common_sp_thumb > a').attr('href');
//                         const ingredients = await getIngredientInfo(recipeId);
//                         arr.push( {
//                             title,
//                             thumbImage,
//                             recipeId,
//                             ingredients
//                         });
//                     })
//                 });

//                 p.then(function () {
//                     resolve(arr);
//                 })
                
//                 return;
//             }
    
//         });
//     })
// }

