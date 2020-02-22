//-----------------------------------------------------------
// REQUIREMENTS
//-----------------------------------------------------------
var bodyParser      = require("body-parser"),
methodOverride      = require("method-override"),
expressSanitizer    = require("express-sanitizer"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();
const port          = 3000;

//-----------------------------------------------------------
// Connecting to RESTfullBlogApp Database
//-----------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/weather', {useNewUrlParser: true, useUnifiedTopology: true});

//-----------------------------------------------------------
// APP CONFIG
//-----------------------------------------------------------
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//-----------------------------------------------------------
//  MONGOOSE/MODEL CONFIG
//-----------------------------------------------------------
var messengerSchema = new mongoose.Schema({
    naam: String,
    email: String,
    image: String,
    body: String,
    website: String,
    catogory: String,
    created:  {type: Date, default: Date.now}

});
var Blog = mongoose.model("Blog", messengerSchema);

//-----------------------------------------------------------
//  ROUTES
//-----------------------------------------------------------
app.get("/", function(req, res){
    res.redirect("/weatherapp");
});

app.get("/weatherapp", function(req, res){
    res.render("./index.ejs");
});

app.get("/bedankt", function(req, res){
    res.render("bedankt");
});

app.get("/weer", function(req, res){
    res.render("weer.ejs");
});

app.get("/nieuws", function(req, res){
    res.render("nieuws.ejs");
});

app.get("/regenkaart", function(req, res){
    res.render("regenkaart.ejs");
});

app.get("/nieuwsbrief", function(req, res){
    res.render("nieuwsbrief.ejs");
});

app.get("/regenkaart", function(req, res){
    res.render("regenkaart.ejs");
});

app.get("/overons", function(req, res){
    res.render("overons.ejs");
});

app.get("/form", function(req, res){
    res.render("form.ejs");
});


// INDEX ROUTE -> List
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("./views/index", {blogs: blogs});
        }
    }).sort({ created: 'desc' });
});


// NEW ROUTE
app.get("/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    //create blog
   req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
                //redirect
            res.redirect("/bedankt");
        }
    });
});

// // CREATE ROUTE
// app.post("/messenger", function(req, res){
//     //create blog
//    req.body.messsenger.body = req.sanitize(req.body.messenger.body)
//     Messenger.create(req.body.messenger, function(err, newMessenger){
//         if(err){
//             res.render("new");
//         } else {
//                 //redirect
//             res.redirect("/bedankt");
//         }
//     });
// });










//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    })
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
                res.redirect("/blogs/" + req.params.id);

            }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    })

});

//==========================================================================
//PORT 3000
//==========================================================================
app.listen(port, () => console.log('Weerstation Server is gestart op poort ' +port));  