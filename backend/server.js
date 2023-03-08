import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

function randomId() {
    return Math.random().toString(16).slice(2);
}

function checkForDuplicate(userList, username) {
    const resultArray = userList.filter(user => user.username === username);
    if (resultArray.length === 0) {
        return false;
    } else {
        return true;
    }
}

app.get('/', (req, res) => {
    res.end('Server läuft');
})

app.get('/user/:id', (req, res) => {
    //get id from route
    let id = req.params.id;
    // read file and get data from json (userÖList)
    fs.readFile('./backend/userList.json', function (err, data) {
        // parse string to json object
        data = JSON.parse(data);
        // find user in data.userList by id
        const user = data.userList.find(user=> user.id ===id)
        // save user as json string in tmpUser
        let tmpUser = JSON.stringify(user)
        // send positive status
        res.status(201);
        // send user to client
        res.send(tmpUser);
    });
})



app.post('/register', (req, res) => {
    fs.readFile('./backend/userList.json', function (err, data) {
        const newUser = {
            id: '',
            username: '',
            password: '',
        }
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        console.log(data);

        data = JSON.parse(data);
        const duplicate = checkForDuplicate(data.userList, newUser.username);
        if (duplicate === true) {
            res.end("ist schon bro, anderen namen wählen")
        } else {
            const id = randomId();
            newUser.id = id;
            console.log("newUser:", newUser);

            data.userList.push(newUser);
            data = JSON.stringify(data)

            fs.writeFile('./backend/userList.json', data, function (err) {
                if (err) return console.log(err);
                let tmpUser = JSON.stringify(newUser)
                res.status(201);
                res.end(tmpUser);
            });
        }
    });

})

app.get('/todo/:id', (req, res) => {
    let id = req.params.id
    console.log(id);
    fs.readFile('./backend/todos.json', function (err, data) {
        data = JSON.parse(data);
        const resultArray = data.todos.filter(todo => todo.id === id);
        const todoData = resultArray[0]

        if (todoData !== undefined) {
            console.log(res.url);
            res.status(201);
            res.send(JSON.stringify(todoData));
        } else {
            res.status(400);
            res.end("passwort falsch");
        };
    });
})

app.get('/user/:id', (req, res) => {
    let id = req.params.id
    console.log(id);
    fs.readFile('./backend/userList.json', function (err, data) {
        data = JSON.parse(data);
        const resultArray = data.user.filter(user => user.id === id);
        const userData = resultArray[0]

        if (userData !== undefined) {
            console.log(res.url);
            res.status(201);
            res.send(JSON.stringify(todoData));
        } else {
            res.status(400);
            res.end("passwort falsch");
        };

    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile('./backend/userList.json', function (err, data) {
        data = JSON.parse(data);
        const resultArray = data.userList.filter(user => user.username === username);
        const userData = resultArray[0]

        if (userData !== undefined && userData.password === password) {
            console.log(res.url);
            res.status(201);
            res.send(JSON.stringify(userData));
        } else {
            res.status(400);
            res.end("passwort falsch");
        };

    });



})


app.listen(port, () => {
    console.log("running server on ", port);
})