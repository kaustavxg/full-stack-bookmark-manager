async function getBookmark(){
    const response = await axios.get("http://localhost:3035/");
    const bookmarks = response.data;

    const bookmarkList = document.querySelector('.bookmark-list');

    if(bookmarks.length === 0){
        bookmarkList.innerHTML = '<div class="empty-state">No bookmark yet. Add one above!</div>';
        return;
    }

    let list = "";
    bookmarks.forEach(bookmark => {
        
        list +=
        `
        <div class="todo-item">
            <span class="bookmark-url">${bookmark.url}</span>
            <span class="bookmark-category">${bookmark.category}</span>
            <button class="delete-btn" onclick="deleteBookmark('${bookmark.id}')">Delete</button>
        </div>
        `
    })

    bookmarkList.innerHTML = list;
}

async function addBookmark(){
    const url = document.getElementById('bookmark-url');
    const category = document.getElementById('bookmark-category');

    if(url.value === ""){
        alert("Please enter a url");
        return;
    }

    if(category.value === ""){
        alert("Please enter a category");
        return;
    }

    try{
        await axios.post("http://localhost:3035/addBookmark", {
            url: url.value,
            category: category.value
        })

        url.value = "";
        category.value = "";

        
        getBookmark();

    } catch (error){
        console.log(`Error in adding bookmark is: ${error}`);
    }
}

async function deleteBookmark(id){
    try {
        await axios.delete(`http://localhost:3035/deleteBookmark/${id}`)
    } catch (error){
        console.log(`Error in deleting bookmark: ${error}`);
    }
    getBookmark();
}

getBookmark();