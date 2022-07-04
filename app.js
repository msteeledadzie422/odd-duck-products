'use strict';

let imageEls = document.querySelectorAll('img');
let roundEl = document.getElementById('round-number');

let chartEl = document.getElementById('myChart');
let ctx = chartEl.getContext('2d');

const imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']

const images = [];

let maxRounds = 25;
let round = 0;

const randomImage = function () {
    let index = Math.floor(Math.random() * imgArray.length);
    return index;
}

function Image(image) {
    this.votes = 0;
    this.views = 0;
    this.id = image;
    this.src = `./img/${image}`;
}

function renderImages() {

    round++
    console.log(`------Round${round}------`)
    let image1 = images[randomImage()];
    let image2 = images[randomImage()];
    let image3 = images[randomImage()];

    while (image1.id === image2.id || image1.id === image3.id) {
        image1 = images[randomImage()];
    }

    while (image2.id === image3.id) {
        image2 = images[randomImage()];
    }

    imageEls[0].id = image1.id;
    imageEls[0].src = image1.src;
    image1.views++;
    imageEls[1].id = image2.id;
    imageEls[1].src = image2.src;
    image2.views++;
    imageEls[2].id = image3.id;
    imageEls[2].src = image3.src;
    image3.views++;
    roundEl.textContent = round
}

for (let i = 0; i < imgArray.length; i++) {
    images.push(new Image(imgArray[i]));
};

imageEls.forEach(function (img) {
    img.addEventListener('click', handleClick);
});

function renderChart() {
    let votes = [];
    let views = [];

    for (let i = 0; i < images.length; i++) {
        votes.push(images[i].votes);
        views.push(images[i].views);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgArray,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: 'yellow'
            }, {
                label: '# of Views',
                data: views,
                backgroundColor: 'purple'
            }],
        }
    });
}

function localStorageCreate() {
    let saveImages = JSON.stringify(images);
    localStorage.setItem('images', saveImages);
}

function localStorageRead() {
    let retrieveImages = localStorage.getItem('images');
    return JSON.parse(retrieveImages);
}

function handleClick(e) {
    e.preventDefault();

    localStorageCreate()

    if (round === maxRounds) {
        let imgEls = document.getElementsByTagName('img');
        console.log(imgEls)
        for (let i = 0; i < imgEls.length; i++) {
            imgEls[i].className = 'hidden'
        }
        let sectionEl = document.getElementById('displayed-images')
        sectionEl.textContent = "All set!  Please see your results below."

        renderChart()
        console.log('from local storage: ')
        console.log(localStorageRead())
    }

    for (let i = 0; i < images.length; i++) {
        if (e.target.id === images[i].id) {
            images[i].votes++;
        }   
    }
    ;
    renderImages();
}

window.onload = renderImages()
