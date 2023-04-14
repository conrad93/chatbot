var app = require("./app");
var BotService = require("./services/bot");

BotService.train();

const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log(`App listening on port - ${PORT}`);
});