const { NlpManager } = require("node-nlp");
const manager = new NlpManager({languages:["en"]});
const fs = require("fs");
const path = require("path");

const train = async () => {
    const files = fs.readdirSync(path.join(__dirname, "..", "intents"));
    for (const file of files) {
        let data = fs.readFileSync(path.join(__dirname, "..", `intents/${file}`));
        data = JSON.parse(data);
        let intent = file.replace(".json","");
        for (const question of data.questions) {
            manager.addDocument("en", question, intent);
        }
        for (const answer of data.answers) {
            manager.addAnswer("en", intent, answer);
        }
    }
    await manager.train();
    manager.save();
};

const post = async (data) => {
    manager.load();
    let response = await manager.process("en", data);
    return response;
};

module.exports = {
    train: train,
    post: post
};
