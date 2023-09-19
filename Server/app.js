
let mysql = require('mysql');
let express = require('express');
let cors = require('cors');
const app = express()


app.use(cors())
app.use(express.json())

let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'muvitaskdb'
});
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL');
    }else{
        console.log('Connected to MySQL');
    }
  });

  app.get('/getUser/:email',(req,res)=>{
    const email = req.params.email
    connection.query(`SELECT * FROM users WHERE email=${email}`, (err, results) => {
        if (err) {
         res.send('error')
        }else{
            res.send(results)
        }
        
      });
  })

  app.post('/post',(req,res)=>{
    const sanitizedEmail = connection.escape(req.body.email);
    const sanitizedPassword = connection.escape(req.body.password);

    connection.query(`SELECT * FROM users WHERE email=${sanitizedEmail} AND password=${sanitizedPassword}`,(err) => {
        if (err) {
         res.send(err)
        }else{
          res.send('ok')
          console.log(req.body.email);
        }
      });
  })
  
app.listen(4000, console.log('server start at 4000'))