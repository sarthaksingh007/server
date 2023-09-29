const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const fs = require('fs');
const path = require('path');

const port= process.env.PORT || 5000;

const app=express();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors({origin:'https://client-server-eta.vercel.app',credentials:true}));
// app.use(cors({origin:'http://localhost:3000',credentials:true}));

app.post('/login', async (req, res) => {
  console.log(req.body);
  const filePath = path.join(__dirname, 'users.json');
  const usersData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const foundUser = usersData.find((user) => user.username === req.body.username && user.phone === req.body.password);

  if (foundUser) {
    res.json({ message: 'Found' });
  } else {
    res.json({ message: 'Not Found' });
  }
});

app.listen(port,()=>{
    console.log("server started");
});
