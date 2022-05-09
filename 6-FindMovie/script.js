
/*Feladat:

1.

    - Form submit eseményre szedd ki az input mezőkben lévő értékeket --kész

    - Ha a keresőszó üres, dobj fel alert dobozt "Keresőszó kitöltése kötelező" felirattal --kész

    - Ha van keresőszó, akkor encodeURI() beépített function-nel alakítsd át URL kompatibilis formára --kész

    - Küldj AJAX kérést GET methoddal a 
        http://www.omdbapi.com/?s={keresőszó}&y={évszám}&apiKey=9606ae0f URL-re --kész

    - A válaszként kapott filmeket rendereld ki a "movies" id-jú element belsejébe,
        az alábbi template alapján:

        <li>
            <div class="poster-wrap">
                <a>
                    <img src="{Borítókép (Poster)}" class="movie-poster" />
                </a>
            </div>
            <p data-imdbid="{Egyedi azonosító (imdbID)}" class="single-movie-btn">
                <span class="movie-title">
                    {Cím (Title)}
                </span>
            </p>
            <span class="movie-year">
                {Évszám (Year)}
            </span>
        </li> --kész
2.
    - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
        http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re

    - A szerver válaszát jelenítsd meg a felhasználónak --kész
*/

document.getElementById('search').addEventListener('submit',(event)=>{
    event.preventDefault();
    let word = event.target.elements.search.value;
    let year = event.target.elements.year.value;
    if (!word) {
        alert("Keresőszó kitöltése kötelező");
    }
    let codedword = encodeURI(word);
    let codedyear = encodeURI(year);
    fetch(`http://www.omdbapi.com/?s=${codedword}&y=${codedyear}&apiKey=9606ae0f`)
    .then(response => response.json())
    .then(res => {
        if (!res.Search) {
            return Promise.reject('Sikertelen keresés!');
        }
    })
    .then(data => render(data))
    .catch(error => alert(error))
})

function render(array){
    let html = '';
    for (const film of array.Search) {
        html += `
    <li>
        <div class="poster-wrap">
            <a>
                <img src="${film.Poster}" class="movie-poster" />
            </a>
        </div>
        <p data-imdbid="${film.imdbID}" class="single-movie-btn">
            <span class="movie-title">
                ${film.Title}
            </span>
        </p>
        <span class="movie-year">
            ${film.Year}
        </span>
    </li>`
    }
document.getElementById('movies').innerHTML = html;

    let buttons = document.querySelectorAll('.single-movie-btn');
    for (const button of buttons) {
        button.onclick = function(event){
            let id = event.target.parentElement.dataset.imdbid;
            fetch(`http://www.omdbapi.com/?i=${id}&apiKey=9606ae0f`)
            .then(response => response.json())
            .then(data => renderdata(data))
        };
    }
};

function renderdata(data){
    document.getElementById('movie-description').innerHTML = `
    <h1>${data.Title}</h1>
    <p>${data.Plot}</p>
    `;
}