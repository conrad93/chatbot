const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY);
console.log(configuration);
const openai = new OpenAIApi(configuration);

const post = async (data) => {
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role:"user",content:"hi"}],
            // messages: data,
        });
        console.log(chatCompletion.data)
        return chatCompletion.data.choices[0].message
    } catch (error) {
        console.log(error);
        return '';
    }
};

module.exports = {
    post: post
};