const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());


// ================= USERS =================

const users = [
    {
        "id": 1,
        "name": "John",
        "gender": "Male",
        "image": "frontend/images/john.png"
    },
    {
        "id": 2,
        "name": "Ms mestan bademci",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/25.jpg"
    },
    {
        "id": 3,
        "name": "Ms cyelen",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/21.jpg"
    },
    {
        "id": 4,
        "name": "Ms Jessica silvia",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/54.jpg"
    },
    {
        "id": 5,
        "name": "Ms Julia rey",
        "gender": "Female",
        "image": "https://randomuser.me/api/portraits/women/44.jpg"
    }
];


// ================= GET ALL USERS =================

app.get("/api/users", function(req, res) {
    res.status(200).json(users);
});


// ================= GET USER BY ID =================

function getUserById(id) {

    for (var i = 0; i < users.length; i++) {

        if (id == users[i].id) {
            return i;
        }

    }

    return -1;
}

app.get("/api/users/:id", function(req, res) {

    var uid = req.params.id;

    console.log("User id is: " + uid);

    var userid = getUserById(uid);
    if (userid == -1) {
        return res.status(404).json({
            "message": "User not found"
        });
    }

    res.status(200).json(users[userid]);
});


// ================= RANDOM USER =================

app.get("/api/randomuser", function(req, res) {

    var n = users.length;

    const randomid = Math.floor(Math.random() * n);

    res.status(200).json(users[randomid]);
});


// ================= ADD USER =================

app.post("/api/users", function(req, res) {

    const { id, name, gender, image } = req.body;


    if (!id) {
        return res.status(400).json({
            "message": "Id is required"
        });
    }


    if (!name) {
        return res.status(400).json({
            "message": "Name is required"
        });
    }


    if (!gender) {
        return res.status(400).json({
            "message": "Gender is required"
        });
    }


    if (!image) {
        return res.status(400).json({
            "message": "Image is required"
        });
    }


    const user = {
        "id": id,
        "name": name,
        "gender": gender,
        "image": image
    };


    users.push(user);


    res.status(201).json({
        "message": "User added successfully",
        "user": user
    });

});


// ================= DELETE USER BY INDEX =================

app.delete("/api/users/:index", function(req, res) {

    const index = parseInt(req.params.index);


    if (index < 0 || index >= users.length || isNaN(index)) {

        return res.status(404).json({
            "message": "User not found"
        });

    }


    const deletedUser = users.splice(index, 1);


    res.status(200).json({
        "message": "User deleted successfully",
        "user": deletedUser[0]
    });

});


// ================= FRONTEND =================

app.use(express.static("frontend"));


// ================= START SERVER =================

app.listen(port, function() {

    console.log(
        "My app is running at http://localhost:" + port
    );

});