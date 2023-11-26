var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config();


var app = express();

app.use(cors());
app.use(express.urlencoded({exteneds: false}));
app.use(express.json());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  
// });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if(file){
    const name = file.originalname;
    const type = file.mimetype;
    const size = file.size;
    res.status(200).json({name: name, type: type, size: size});
  }
  else{
    res.satus(400).json({error: "Error"});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
