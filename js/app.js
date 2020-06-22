{
/* <div class="card border-primary mb-3">
            <div class="card-body">
                <img class="card-img-top" src="..." alt="Card image cap">
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Movie Name (Year)</li>
            </ul>
    </div> */
}

let api_key = 'e78bf73d6b69110ff0bd0bf4947b344c';
let base_url ='https://image.tmdb.org/t/p/w342';



window.onload = function(){


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



    let popularPromiseObj = get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`);
    popularPromiseObj.then(message =>{
        message.results.forEach(item =>{

            // console.log(item);

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
            imgTemplate.alt = 'Movie Poster';
            imgTemplate.src =`${base_url}${item.poster_path}`;
            
            cardTemplate.appendChild(cardBodyTemplate).appendChild(imgTemplate);
            let year = item.release_date.slice(0,4);
            cardLiTemplate.textContent = `${item.title.slice(0,30)} (${year})`;
            cardTemplate.appendChild(cardUlTemplate).appendChild(cardLiTemplate);

            mainBody.appendChild(cardTemplate);
        })
    })
}
