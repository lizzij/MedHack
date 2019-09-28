// external dependences: node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// node core libraries
const path = require('path');
<<<<<<< HEAD
// const fs = require('fs');
=======
const fs = require('fs');
>>>>>>> 429d732bfa7237da9a2ad51359f8eaa4615f9b90

// model imports
const Patient = require('./models/patient');

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = require('./magic').MONGO_URI;

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

// controllers
// routes

const bloodRoutes = require('./routes/bloodRoutes');


// examples
// const loggerRoutes = require('./routes/logger_routes');

// initialize and configure app
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// configer app
app.set('view engine', 'ejs');
app.set('views', 'views');

// static file server
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// request response cycle
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

// routes
app.get('/test', (req, res, next) => {
    res.json({
        name: 'random dude',
        bloodPressure: 440000
    });
});

app.get('/create-user', (req, res, next) => {
<<<<<<< HEAD

=======
    const nPatient = new Patient({
        name: 'BOB',
        log: [
            {
                time: 'test',
                bloodPressure: 130
            }
        ]
    });

    nPatient.save()
    .then(result => {
        res.status(200).json({
            userCreation: 'OK'
        })
    })
    .catch(err => {
        console.log(err)
    });
>>>>>>> 429d732bfa7237da9a2ad51359f8eaa4615f9b90
});

app.use(bloodRoutes);
app.get('/', (req, res, next) => {
    res.send('med Hacks woo hoo!');
})

// routes for error
// app.use((req, res, next) => {
//     res.render('error');
// });

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});