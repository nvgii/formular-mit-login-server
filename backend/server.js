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


app.post('/register', (req, res) => {
    fs.readFile('./userList.json', function (err, data) {
        const newUser = {
            id: '',
            username: '',
            password: '',
        }
        newUser.username = req.body.username;
        newUser.password = req.body.password;

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

            fs.writeFile('./userList.json', data, function (err) {
                if (err) return console.log(err);
                let tmpUser = JSON.stringify(newUser)
                res.status(201);
                res.end(tmpUser);

            });
        }
    });

})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    fs.readFile('./userList.json', function (err, data) {

        data = JSON.parse(data);
        const resultArray = data.userList.filter(user => user.username === username);
        console.log(resultArray);
        if (resultArray[0].password === password) {
            res.status(200);
            res.end("login geklappt");
        } else {
            res.status(400);
            res.end("passwort falsch");
        };

    });

})

app.listen(port, () => {
    console.log("running server on ", port);
})