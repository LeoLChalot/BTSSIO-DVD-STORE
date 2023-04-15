// Key API
let key = "49ba54f";
// CLASS //
class Film {
	constructor(poster, title, year) {
		(this.poster = poster), (this.title = title), (this.year = year);
	}
	getYear() {
		return this.year;
	}
	getTitle() {
		return this.title;
	}
	getPoster() {
		return this.poster;
	}
}

// Récupération des éléments du DOM
const submit = document.querySelector(".submit");
const btnList = document.querySelector(".btn-list");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
let collection = [];
// Connexion à l'API et recup des infos
function searchMovie() {
	axios
		.get(`http://www.omdbapi.com/?apikey=49ba54f&s=${input.value}&page=1`)
		.then((res) => {
			const { Search } = res.data;
			console.log(Search);
			displayResults(Search);
		})
		.catch((err) => console.log(err));
}
// Affichage de la collection sous la barre de recherche
function displayCollection() {
	ul.innerHTML = "";
	collection.map((collection) => {
		const li = document.createElement("li");
		const img = document.createElement("img");
		const title = document.createElement("h3");
		const year = document.createElement("h4");
		const delBtn = document.createElement("button");
		img.src = collection.poster;
		title.textContent = collection.title;
		year.textContent = collection.year;
		delBtn.textContent = "Supprimer";
        delBtn.classList.add('del-btn')
		li.append(img, title, year, delBtn);
		ul.appendChild(li);
		delBtn.addEventListener("click", (event) => {
			console.log(event.target.parentElement);
			event.target.parentElement.remove();
		});
	});
}
// Affichage des films sous la barre de recherche
function displayResults(movies) {
	ul.innerHTML = "";
	movies.map((movie) => {
		const li = document.createElement("li");
		const img = document.createElement("img");
		const title = document.createElement("h3");
		const year = document.createElement("h4");
		const addBtn = document.createElement("button");

		img.src = movie.Poster;
		title.textContent = movie.Title;
		year.textContent = movie.Year;
		addBtn.textContent = "Ajouter";
        addBtn.classList.add('add-btn');

		li.append(img, title, year, addBtn);
		ul.appendChild(li);

		addBtn.addEventListener("click", (event) => {
			console.log(event.target);
			console.log(event.target.parentElement);
			let parent = event.target.parentElement;
			let poster = parent.getElementsByTagName("img");
			let objPoster = poster[0].src;
			let title = parent.getElementsByTagName("h3");
			let objTitle = title[0].textContent;
			let year = parent.getElementsByTagName("h4");
			let objYear = year[0].textContent;
			let film = new Film(objPoster, objTitle, objYear);
			collection.push(film);
			console.log(collection);
		});
	});
}
// Ajout addEventListener sur les boutons
submit.addEventListener("click", searchMovie);
btnList.addEventListener("click", displayCollection);
