var openai = require("../services/open-ai");

const getResponse = async (req, res) => {
    try {
        let data = req.body.messages;
        let response = await openai.post(data);
        res.status(200).send({status:true, response: response});
    } catch (error) {
        console.log(error);
        res.status(500).send({status:false, message: error.message, error:error});
    }
};

module.exports = {
    getResponse: getResponse
};