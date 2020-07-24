const months = [
    "January",
    "February", 
    "March",
    "April",
    "May ",
    "June" ,
    "July" ,
    "August" ,
    "September", 
    "October" ,
    "November",
    "December",
];
const weekdays =  [
    "Sunday",
    "Monday", 
    "Tuesday", 
    "Wednesday",
    "Thursday", 
    "Friday", 
    "Saturday", 
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//(year, month(0 index), date, hours, ,mins, secs, ms);
let futureDate = new Date(2020, 7, 24, 12, 45, 0, 0);
// console.log(futureDate);

const years = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month = months[month];

//it is also zero indexed
let weekday = futureDate.getDay();
weekday = weekdays[weekday];

giveaway.textContent = `Giveaway End On ${weekday}, ${date} ${month} ${years}, ${hours}:${minutes}pm`;

const futureTime = futureDate.getTime();

function getRemainingTime(){
    const today = new Date().getTime(); 
    const t = futureTime - today;
    // console.log(t);

    // 1secs = 1000ms
    // 1min = 60secs
    // 1hours = 60mins
    // 1day = 24hours

    const oneMinute = 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    let days = Math.floor( t / oneDay );

    let hours = Math.floor( (t % oneDay) / oneHour ); 
   
    let minutes = Math.floor( (t % oneHour) / oneMinute );
   
    let seconds = Math.floor( (t % oneMinute) / 1000 );
   
    // if no. is less than 10 ,then add 0 in front of it like 03,04 etc;
    function format(item){
         if(item < 10){
             return ( item = `0${item}`);
         }
         return item;
    }
    const values = [days, hours, minutes, seconds];
    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });

    if(t<0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
    }
};

let countdown = setInterval( getRemainingTime,1000);

setInterval( getRemainingTime,1000);