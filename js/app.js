// ALL the constants

const API_KEY = 'e78bf73d6b69110ff0bd0bf4947b344c';
const BASE_URL ='https://image.tmdb.org/t/p/w342';
const SEARCH_URL_MOVIE = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const SEARCH_URL_TV = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=`;



window.onload = function(){


    // AJAX to get json data
    function get(url){
        return new Promise((resolve,reject) => {
            const http = new XMLHttpRequest();
            http.open('GET',url);
            http.onload = () =>{
                if(http.status === 200){
                    resolve(JSON.parse(http.responseText));
                }else{
                    reject(http.statusText);
                }
            }
            http.onerror = () =>{
                reject(http.statusText);
            }
            http.send();
        });
    }

    // Manipulate DOM of the Webpage
    function domManipulationFunctionForMoviesAndTv(type,item){
        let mainBody = document.querySelector('div.card-columns');
        let cardTemplate = document.createElement('div');
        cardTemplate.className = "card border-primary mb-3 w-50";
        let cardBodyTemplate = document.createElement('div');
        cardBodyTemplate.className = "card-body";
        let cardUlTemplate = document.createElement('ul');
        let cardLiTemplate = document.createElement('li');
        cardUlTemplate.className = "list-group list-group-flush";
        cardLiTemplate.className = "list-group-item";


        let imgTemplate = document.createElement('img');
        imgTemplate.className = 'card-img-top';
        imgTemplate.alt = `${type} Poster`;
        imgTemplate.src =`${BASE_URL}${item.poster_path}`;
        
        cardTemplate.appendChild(cardBodyTemplate).appendChild(imgTemplate);
        let year = (type == 'Movie')? item.release_date.slice(0,4) : item.first_air_date.slice(0,4);
        cardLiTemplate.textContent = (type == 'Movie')? `${type}: ${item.title.slice(0,30)} (${year})`: `${type}: ${item.name.slice(0,30)} (${year})`;
        cardTemplate.appendChild(cardUlTemplate).appendChild(cardLiTemplate);

        mainBody.appendChild(cardTemplate);

    }

    // popularDetails Fucntion get details according to page and invokes domManipulationFunctionForMoviesAndTv function

    function popularDetails(url,type,page){
        let popularPromiseObj = get(`${url}${page}`);
        popularPromiseObj.then(message =>{
            message.results.forEach(item =>{
                domManipulationFunctionForMoviesAndTv(type,item);
            })
        })

    }

    //Search Movies and TV Shows Function

    function search(searchTerm,page=1){
        let searchPromiseObj = get(`${SEARCH_URL_MOVIE}${searchTerm}&page=${page}`);
        let searchPromiseObjTv = get(`${SEARCH_URL_TV}${searchTerm}&page=${page}`)

        searchPromiseObj.then(message => {
            totalPages = message.total_pages;
            if(totalPages!=0){
                message.results.forEach(item => {
                    domManipulationFunctionForMoviesAndTv('Movie',item);
                });
            }
        });

        searchPromiseObjTv.then(message => {
            totalPages = message.total_pages;
            if(totalPages!=0){
                message.results.forEach(item => {
                    domManipulationFunctionForMoviesAndTv('Tv Show',item);
                });
            }
        });
    }

    // Popular Movies - Default
    {
        popularDetails(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`,'Movie',1);
        popularDetails(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`,'Movie',2);
        popularDetails(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`,'Movie',3);
    }

    // Popular Tv Show Functionality
    const popularTvShowsEvent = document.querySelector('a#popularTvShows');

    popularTvShowsEvent.addEventListener('click', () =>{
        let cardBlock = document.querySelector('div.card-columns');
        cardBlock.innerHTML = '';
        popularDetails(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=`,'Tv Show',1)
        popularDetails(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=`,'Tv Show',2)
        popularDetails(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=`,'Tv Show',3)

    })

    // Search Functionality
    const searchBar = document.querySelector('form.form-inline');

    searchBar.querySelector('button').addEventListener('click', () => {
        
        let cardBlock = document.querySelector('div.card-columns');
        cardBlock.innerHTML = '';
        searchTerm = searchBar.querySelector('input').value;
        search(searchTerm,1);
        search(searchTerm,2);
        search(searchTerm,3);
    })
}