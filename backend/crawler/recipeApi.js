const request = require("request");
const cheerio = require("cheerio");
const Recipe = require("../models/Recipe");
const axios = require("axios");
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
    //scope = page % 4;
    //page = parseInt(page / 4) + 1;

    console.log(name, page);

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
        let url = String.format(searchURL, encodeURI(name), page);

        request(url,  async (error, response, body) => {
            if (error) {
                console.error(error);
                return;
            }
            
            if (response.statusCode === 200) {
                const $ = cheerio.load(body);
                const recipeElementList = $(".common_sp_list_li").toArray();

                for (let i = 0; i < recipeElementList.length; i++){
                    const item = recipeElementList[i];
                    const title = $(item).find('div.common_sp_caption > .common_sp_caption_tit.line2').text();
                    const thumbImage = $(item).find('.common_sp_thumb > .common_sp_link > img').attr('src');
                    const recipeId = $(item).find('.common_sp_thumb > a').attr('href').split("/")[2];
                    
                    arr.push( {
                        title,
                        thumbImage,
                        recipeId,
                    });

                }

                resolve(arr);
            }
    
        });
    })
}


module.exports.getIngredientInfo = (recipeUrl) => {
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

module.exports.startCrawling =async () => {
    const baseUrl = "https://www.10000recipe.com/recipe/";
    for (let i = 6963110; i <= 6963120; i++) {
      const recipeUrl = `${baseUrl}${i}`;
        const recipeData = await getRecipeData(recipeUrl);
        console.log(recipeData);
      //await storeRecipeData(recipeData);
    }
}

async function getRecipeData(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
        
      const recipe_id = url.split("/").pop();
      const recipe_name = $(".view2_summary h3").text();
      let ingredients = $(".cont_ingre2 ul li a:first-child").text();

      ingredients = ingredients
        .replace(/\r?\n/g, "")
        .replace(/\s+/g, " ")
        .replace(/구매 가능/g, "")
        .trim();

      const rating = $(".count_recom").text().trim();
  
      return {
        recipe_id,
        recipe_name,
        ingredients:ingredients.split(" "),
        rating
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  async function storeRecipeData(recipeData) {
    try {
      const recipe = new Recipe(recipeData);
      await recipe.save();
      console.log(`Successfully stored recipe: ${recipeData.recipe_name}`);
    } catch (error) {
      console.log(error);
    }
  }

