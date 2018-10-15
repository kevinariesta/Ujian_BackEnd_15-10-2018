const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 2018;

var url = bodyParser.urlencoded({ extended: false });

app.use(url);
app.use(bodyParser.json());
app.use(cors()); 
app.set('view engine' , 'ejs'); 

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'saitama',
    password: '123456',
    database: 'hotelbertasbih',
    port: 3306
});

app.get('/', (req, res) => {
    res.send("<h1>API Hotel Bertasbih BERJALAN!!!</h1>");  
});

app.get('/kamar', (req, res) => {
    var sql = `select * from tablekamar;`;

    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send(results);
        console.log(results);
    })
});

app.post('/kamar', (req, res) => {
    const { nomorkamar, idCategory, harga } = req.body;
    var data = {
        nomorkamar: nomorkamar,
        categoryid: idCategory,
        harga: harga
    };

    var sql = `INSERT INTO tablekamar SET ?`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;

        sql = `select * from tablekamar;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
            console.log(results1);
        })
    })
});

app.get('/kamar/:idCat', (req, res) => {
    const { idCat } = req.params;

    var sql = `select * from tablekamar
                where categoryid like '%${idCat}%';`;
    conn.query(sql, (err, results) => {
        if(err) throw err;
        
        res.send(results);
        console.log(results);
    })
});

app.delete('/kamar/:id', (req, res) => {
    var sql = `DELETE FROM tablekamar WHERE id = ` + req.params.id;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        sql = `select * from tablekamar;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
            console.log(results1);
        })
    })
});

app.put('/kamar/:id', (req, res) => {
    const { nomorkamar, idCategory, harga } = req.body;
    const { id } = req.params;
    var data = {
        nomorkamar: nomorkamar,
        categoryid: idCategory,
        harga: harga
    }

    var sql = `UPDATE tablekamar SET ? WHERE id = ${id};`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;

        sql = `select * from tablekamar WHERE id = ${id};`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
            console.log(results1);
        })
    })
});

app.get('/category', (req, res) => {
    var sql = `select * from tablecategory;`;

    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send(results);
        console.log(results);
    })
});

app.post('/category', (req, res) => {
    const { namaCat } = req.body;
    var data = {
        namacategory: namaCat
    };
    
    var sql = `INSERT INTO tablecategory SET ?`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;

        sql = `select * from tablecategory;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;
    
            res.send(results1);
            console.log(results1);
        })
    })
});

app.get('/category/:id', (req, res) => {
    const { id } = req.params;

    var sql = `select * from tablecategory
                WHERE id LIKE '%${id}%';`;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send(results);
        console.log(results);
    })
});

app.delete('/category/:id', (req, res) => {
    var sql = `DELETE FROM tablecategory WHERE id = ` + req.params.id;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        sql = `select * from tablecategory;`;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
            console.log(results1);
        })
    })
});

app.put('/category/:id', (req, res) => {
    const { namaCat } = req.body;
    var data = {
        namacategory: namaCat
    };

    var sql = `UPDATE tablecategory SET ? WHERE id = ` + req.params.id;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;

        sql = `select * from tablecategory WHERE id = ` + req.params.id;
        conn.query(sql, (err1, results1) => {
            if(err1) throw err1;

            res.send(results1);
            console.log(results1);
        })
    })
});

app.get('/user', (req, res) => {
    var sql = `select * from tableuser;`;

    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send(results);
        console.log(results);
    })
});

app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;
    var data = {
        username: username,
        email: email,
        password: password,
        role: role
    };

    var sql = `INSERT INTO tableuser SET ?`;
    conn.query(sql, data, (err, results) => {
        if(err) throw err;

        res.send('Register Success!!');
        console.log(results);
    })
})

app.get('/login', (req, res) => {
    const { email, password } = req.query;

    var sql = `select * from tableuser 
                where email = ${email}
                AND password = ${password};`;
    conn.query(sql, (err, results) => {
        if(err) throw err;

        res.send('Login Success!!');
        console.log(results);
    })
})

app.listen(port, () => console.log(`API Hotel Bertasbih listening on port ${port}!`));
