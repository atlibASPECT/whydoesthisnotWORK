const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.collection.toLowerCase().includes(searchString) ||
            character.price.toLowerCase().includes(searchString) ||
            character.link.toLowerCase().includes(searchString) ||
            character.alt.toLowerCase().includes(searchString) ||
            character.img.toLowerCase().includes(searchString) 
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5501/api.html');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
        console.log("Its Working")
    } catch (err) {
        console.error(err);
        console.log("Its Not Working")
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
            <h1>Name: ${character.name}</h1>
            <h2>Collection: ${character.collection}</h2>
            <p>Price: ${character.price}</p>
            <p class="link">Link: <a href="${character.link}" class="alink" target="_blank">${character.link}</a></p>
            <div class="outer">
            <div class="images" id="images">
            <div class="di1" id="di1" onmouseenter="hover1()" onmouseleave="hover1leave()"><img src="${character.img}" alt="${character.alt}" class="i1" id="i1"></img></div>
            <div class="di2" id="di2" onmouseenter="hover2()" onmouseleave="hover2leave()"><img src="${character.img}" alt="${character.alt}" class="i2" id="i2"></img></div>
            <div class="di3" id="di3" onmouseenter="hover3()" onmouseleave="hover3leave()"><img src="${character.img}" alt="${character.alt}" class="i3" id="i3"></img></div>
            <div class="di4" id="di4" onmouseenter="hover4()" onmouseleave="hover4leave()"><img src="${character.img}" alt="${character.alt}" class="i4" id="i4"></img></div>
            </div>
            </div>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
