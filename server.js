const { request, response } = require("express");
const express = require("express");
const port = process.env.PORT || 3000;
const server = express();

const theAnswer = "mario";
server.get("/guess/:word", (request, response) => {
  const userword = request.params.word;
  const arr = [];
  for (let i = 0; i < userword.length; i++) {
    const ch = userword[i];
    if (ch == theAnswer[i]) {
      arr.push(1);
    } else if (theAnswer.includes(ch)) {
      arr.push(0);
    } else {
      arr.push(-1);
    }
  }
  response.json(arr);
});

server.use(express.static("public"));

server.listen(port, () => {
  console.log("server in running on port 3000");
});
