function index(request, response) {
  response.status(404).json("Not Found.");
}

module.exports = {
  index
};
