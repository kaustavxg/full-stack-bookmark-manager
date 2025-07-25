const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

let bookmarks = [];
let currentId = 1;

function validateBookmark(req, res, next){
    const url = req.body.url;
    const category = req.body.category;

    if(!category || !url){
        res.status(404).json({
            error: "Bookmark URL or category missing"
        })
    }

    next();
}

app.post('/addBookmark', validateBookmark ,function(req, res){
    const url = req.body.url;
    const category = req.body.category;

    const id = currentId++;
    
    bookmarks.push({
        id,
        url,
        category
    })

    res.json(bookmarks);

})

app.delete('/deleteBookmark/:id', function(req, res){
    try{
        const id = Number(req.params.id);
        const bookmarkIndex = bookmarks.find(b => b.currentId === id)

        if(bookmarkIndex !== -1){
            bookmarks.splice(bookmarkIndex, 1);
            res.json({
                message: "bookmark deleted successfully"
            })
        } else {
            res.status(404).json({
                error: "Bookmark not found"
            })
        }

        return;

    } catch (error){
        return res.status(500).json({
            error: "An error occurred while deleting the bookmark"
        })
        return
    }
})

app.get('/', function(req, res){
    res.json(bookmarks);
})

app.listen(3035, () => {
    console.log("listening on port 3035");
})