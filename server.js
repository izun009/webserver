const express = require('express');
const hbs = require('hbs'); // template engine
const PORT = process.env.PORT || 3000;
var app = express();
var fs = require('fs');

// untuk memecah lagi dalam sebuah file di folder view/partials
hbs.registerPartials(__dirname + '/views/partials');
// untuk mem-fetching file di view
app.set('view engine','hbs');


// middlleware
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);

    // menyimpan history atau log dalam bentuk file system
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to save log file in server.log');
        }
    });
    next();
});

// jika suatu web terdapat maintance
// app.use((req,res,next) => {
//     res.render('maintance.hbs');
// });

// untuk mem-fetching file di folder public
app.use(express.static(__dirname + '/public'));

// untuk menampilkan tahun saat ini
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// untuk menjadikan semua huruf kapital
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req,res) => {
//     res.send({
//         name: "Izzun",
//         hobby:[
//             "Learning",
//             "Jungling",
//             "Playing Football"
//         ]
//     });
// });

app.get('/', (req,res) => {
    res.render('home.hbs', { //render berfungsi untuk mem-fetching file di view pada template engine
        pageTitle: "This Home Page",
        message: "Testing render node js module in Home Page",
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: "This About Page",
        message: "Testing render node js module in About Page",
    });
});


app.get('/bad', (req,res) => {
    res.send({
        errorMessage : "Unable to Handle Request"
    });
});

app.listen(PORT);
console.log("Server running in port 3000");