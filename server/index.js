const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const querystring = require("querystring");
var cors = require("cors");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/authenticate", (req, res) => {
  const { client_id, redirect_uri, client_secret, code } = req.body;
  let data = {
    client_id,
    redirect_uri,
    client_secret,
    code,
  };
  // Request to exchange code for an access token
  axios
    .post("https://github.com/login/oauth/access_token", data)
    .then((response) => {
      let { access_token } = querystring.parse(response.data);
      return res.status(200).send({
        message: "Access token successfully fetched",
        access_token,
      });
    })
    .catch((error) => {
      return res.status(200).send({
        message: "Failed while fetching access_token",
        error: error,
      });
    });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
