const { NlpManager } = require("node-nlp");
const manager = new NlpManager({languages:["en"]});
const fs = require("fs");
const path = require("path");

const train = async () => {
    //old
    // const files = fs.readdirSync(path.join(__dirname, "..", "intents"));
    // for (const file of files) {
    //     let data = fs.readFileSync(path.join(__dirname, "..", `intents/${file}`));
    //     data = JSON.parse(data);
    //     let intent = file.replace(".json","");
    //     for (const question of data.questions) {
    //         manager.addDocument("en", question, intent);
    //     }
    //     for (const answer of data.answers) {
    //         manager.addAnswer("en", intent, answer);
    //     }
    // }

    //new
    let data = fs.readFileSync(path.join(__dirname, "..", `intents/data.json`));
    data = JSON.parse(data);
    data.intents.forEach(element => {
        for (const pattern of element.patterns) {
            manager.addDocument("en", pattern, element.tag);
        }
        for (const response of element.responses) {
            manager.addAnswer("en", element.tag, response);
        }
    });

    await manager.train();
    manager.save();
    manager.load();
};

const post = async (data) => {
    let response = await manager.process("en", data);
    return response;
};

module.exports = {
    train: train,
    post: post
};
