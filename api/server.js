let express = require('express');
const path = require('path');

let app1 = express();
let bodyParser = require("body-parser");
app1.disable("x-powered-by");

let helmet = require("helmet");
let app = express();
app.use(helmet.hidePoweredBy());
const port = 8080;

const cors = require('cors');
app.use(cors());

const users = [1,2,3,4,5,6,7];

app.use(bodyParser.json());
// production
// app.use(express.static(path.join(__dirname, '../ui/build')));

app.get('/api/test', (req, res) => {
  console.log('api/test called!!!!')
  res.json(users);
});

app.get('/', (req,res) => {
    // production
    // res.sendFile(path.join(__dirname, '../ui/build/index.html'));
    res.json('home page api');
  });

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});