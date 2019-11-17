const v1apiRoute = require("./apis");
const indexRoute = require("../controllers/home");

function init(server) {
  // server.get('*', (req, res, next) => {
  // 	console.log(`Request was made to: ${req.originalUrl}`);
  // 	indexRoute(req, res);
  // 	return next();
  // });

  server.use("/v1", v1apiRoute); // Mount /v1 routes under /v1 on the parent route `/`
  server.use("/", indexRoute);

  // Other parent routes/endpoints go under
}

module.exports = { init };
