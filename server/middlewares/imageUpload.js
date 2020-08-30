const multiParty = require("connect-multiparty");

exports.multipartyMiddleware = multiParty({ uploadDir: "./images" });
