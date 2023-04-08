
//movies class to store name and genre
class Movies {
    constructor(name, genre){
        this.name = name;
        this.genre = genre;
    }
}

//movie list class to store all movies
class List {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.movieList = [];
    }

//method for adding movies to list
    addMovies(movies) {
        this.movieList.push(movies);
    }

    //method for deleting a movie
    deleteMovies(movies) {
            let index = this.movieList.indexOf(movies);
            this.movieList.splice(index, 1);
        }
    }

let lists = []; //stores each movie list
let movieId = 0; //id to identify each movie list


onCLick('new-movie-list', () => {
    lists.push(new List(movieId++, getValue('new-list-name')));
    drawDOM();
});

//Function to add event listeners
function onCLick(id, action){
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//functon to get value
function getValue(id){
    return document.getElementById(id).value;
}

//function to iterate over lists array and turn them into a table
function drawDOM(){
    let listDiv = document.getElementById('lists'); //clear movie div
    clearElement(listDiv);
    for (list of lists ) { //iterate through each instance of list class
        let table = createMovieListTable(list);
        let title = document.createElement('h2');
        title.innerHTML = list.name; //title for list class
        title.appendChild(createDeleteListButton(list)); //generete delete button
        listDiv.appendChild(title);
        listDiv.appendChild(table);
        for (movies of list.movieList) {       //add movies to list
            createMovieRow(list, table, movies);
        }
    }
}

//implement create movie row
function createMovieRow(list, table, movies) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = movies.name;
    row.insertCell(1).innerHTML = movies.genre;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(list, movies));
}

//implement delete row
function createDeleteRowButton(list, movies) {
    let btn = document.createElement('button')
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = list.movieList.indexOf(movies);
        list.movieList.splice(index,1);
        drawDOM();
    };
    return btn;
}

//implement create delete team btn
function createDeleteListButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete List';
    btn.onclick = () => {
        let index = lists.indexOf(list);
        lists.splice(index, 1);
        drawDOM();
    };
    return btn;
}


function createNewMovieButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        const newMovieName = getValue(`name-input-${list.id}`);
        const newMovieGenre = getValue(`genre-input-${list.id}`);
        const newMovie = new Movies(newMovieName, newMovieGenre);
        list.movieList. push(newMovie);
        drawDOM();
    };
    return btn;
}

//create list table
function createMovieListTable(list) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let genreColumn = document.createElement('th');
    nameColumn.innerHTML = 'Movie Name';
    genreColumn.innerHTML = 'Genre';
    row.appendChild(nameColumn);
    row.appendChild(genreColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let genreTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${list.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let genreInput = document.createElement('input');
    genreInput.setAttribute('id', `genre-input-${list.id}`);
    genreInput.setAttribute('type', 'text');
    genreInput.setAttribute('class', 'form-control');
    let newMovieButton = createNewMovieButton(list);
    nameTh.appendChild(nameInput);
    genreTh.appendChild(genreInput);
    createTh.appendChild(newMovieButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(genreTh);
    formRow.appendChild(createTh);
    return table;

}

//clear Element
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

