const MOVIE_CONTAINER = document.getElementById('contenedor');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

let page = 1;
btnNext.addEventListener('click', () => {
    if (page >= 1000) return
    page += 1;
    loadMovies();
});

btnPrev.addEventListener('click', () => {
    if (page <= 1) return 
    page -= 1;
    loadMovies();
});

const loadMovies = async() => {
    try {
        const answerAPI = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${page}`);
    
        console.log(answerAPI);

        const errorMessages = {
            401: "Pusiste mal la key",
            404: "La película no existe"
        }
        
        if (answerAPI.status !== 200) {
            return console.log(errorMessages[answerAPI.status] ?? 'Error');
        }

        const DATA_API = await answerAPI.json();

        let movies = '';
        DATA_API.results.forEach(movie => {
            movies += 
            `   
                <div class="pelicula">
                    <div class="container-img">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Portada de la película" class="poster">
                    </div>
                    <div class="container-title">
                        <h3 class="titulo">${movie.title}</h3>
                    </div>
                </div>    
            `;
        });

        MOVIE_CONTAINER.innerHTML = movies;

    } catch(error) {
        console.log(error);
    }
}

loadMovies();