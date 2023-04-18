var BotService = require("../services/bot");

const getResponse = async (req, res) => {
    try {
        let msg = req.body.message;
        let response = await BotService.post(msg);
        res.status(200).send({status:true, response: response.answer ? response.answer : 'I am not program for this, please ask appropriate query'});
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message: error.message, error:error});
    }
};

module.exports = {
    getResponse: getResponse
};