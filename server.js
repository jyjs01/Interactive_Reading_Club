const http = require('http');
const url = require('url');
const mysql = require('mysql2');

const hostname = 'localhost';
const port = 4000;

// 서버 생성
const app = http.createServer((request,response)=>{
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    // DB 연결

    let DB = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'interactive_reading_club'
    });
      
    DB.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
      }
      console.log('Connected to the database as ID', DB.threadId);
    });


    DB.query('SELECT * FROM Book', (error, results, fields)=>{
      if (error) {
          console.log(error);
      }
      console.log(results);

      DB.end((err) => {
        if (err) {
          console.error('Error ending the DB:', err.stack);
          return;
        }
        console.log('Connection ended');
      });
    });
   
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });