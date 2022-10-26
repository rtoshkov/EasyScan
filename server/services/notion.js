const {Client} = require("@notionhq/client");
const {NOTION_KEY, NOTION_DATABASE_ID} = require('../config');

function createBulletItems(item){
    return {
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
            'rich_text': [{
                'type': 'text',
                'text': {
                    'content': item,
                    'link': null
                }
            }]
        },
    }
}

function currentDate(){
    const currentDate = new Date();
    return`${currentDate.getDate()}-${currentDate.getMonth()+1} | ${currentDate.getHours()}:${currentDate.getMinutes()}`
}

async function saveToNotion(record){
    const notion = new Client({auth:NOTION_KEY});
    const databaseID = NOTION_DATABASE_ID;
    const children = [];
    record.forEach((item) => {
        const record =  createBulletItems(item);
        children.push(record);
    })

    console.log(children);

    const response = await notion.pages.create({
        parent: {database_id: databaseID},
        properties: {
            title: {
                title:[
                    {
                        'text': {
                            'content': currentDate()
                        }
                    }
                ]
            },
        },
        children: children
    });

    return response;
}

module.exports = {
    saveToNotion,
}