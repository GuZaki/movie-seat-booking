'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.querySelector('.movie');
const seatNum = document.querySelector('.text-span');

populateUI()

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // copy selected seats into array
    //map through array
    // return new array indexes

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    
    total.innerText = selectedSeatsCount * ticketPrice;
    count.innerText = selectedSeatsCount;

    if
        (selectedSeatsCount === 1 ||
        selectedSeatsCount === 21 ||
        selectedSeatsCount === 31 ||
        selectedSeatsCount === 41){
        
        seatNum.innerText = ` место`;
    }
    else if
        ((selectedSeatsCount > 1 && selectedSeatsCount < 5) ||
        (selectedSeatsCount > 21 && selectedSeatsCount < 25) ||
        (selectedSeatsCount > 31 && selectedSeatsCount < 35) ||
        (selectedSeatsCount > 41 && selectedSeatsCount < 45)){

        seatNum.innerText = ` места`;
    } 
    else {
        seatNum.innerText = ` мест`;
    }
}

//Get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', (event) =>{
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value);
    
    updateSelectedCount();
    
})

// Seat click event
container.addEventListener('click', event =>{
    if(event.target.classList.contains('seat') && 
    !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

// seats.forEach(seat =>{
//     seat.addEventListener('click', () =>{
//         seat.classList.toggle('selected');// toggle добавляет класс при клике и убирает класс при повторном клике
//     })
// })

//Initial count and total set
updateSelectedCount()