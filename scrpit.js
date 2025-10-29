const curentDay = document.querySelector("#curent_date");
const form = document.querySelector("form");
var isInvalidYear = false;
var isInvaliddate = false;
var isvalidmonth = false;

const day = new Date();
let date = day.getDate();
let mon = day.getMonth() + 1;
const year = day.getFullYear();

function curentDayfun() {
    if (date < 10) date = "0" + date;
    if (mon < 10) mon = "0" + mon;
    const cnfdate = `${year}-${mon}-${date}`;
    curentDay.value = cnfdate;
}

function UserValiddate() {
    if (isInvalidYear) {
        alert("You’re kidding me 😅 — please enter a valid year!");
        document.querySelector("#year").value = "";
    }
    if (isInvaliddate) {
        alert("Oops! Invalid date entered ");
        document.querySelector("#day").value = "";
    }
    if (isvalidmonth) {
        alert("Please check your month value ");
        document.querySelector("#month").value = "";
    }
}

function UpdateDom(diffYear, diffMonth, diffDate) {

    if (isNaN(diffYear)) diffYear = 0;

    document.querySelector(".age").innerHTML = diffYear;
    document.querySelector(".year").innerHTML = diffYear;
    document.querySelector(".month").innerHTML = diffMonth;
    document.querySelector(".day").innerHTML = diffDate;

    // If age is 0, reset all fields to 0
    if (diffYear == 0) {
        document.querySelector(".year").innerHTML = 0;
        document.querySelector(".month").innerHTML = 0;
        document.querySelector(".day").innerHTML = 0;
    }
}

/*  Calculate Exact Age (Years, Months, Days) */
function calculateyear() {
    let userDate = parseInt(document.querySelector("#day").value);
    let userMonth = parseInt(document.querySelector("#month").value);
    let userYear = parseInt(document.querySelector("#year").value);

    let currentDate = date;
    let currentMonth = mon;
    let currentYear = year;

    // Prevent future dates
    if (
        userYear > currentYear ||
        (userYear === currentYear && userMonth > currentMonth) ||
        (userYear === currentYear && userMonth === currentMonth && userDate > currentDate)
    ) {
        alert("Future date not allowed");
        return;
    }

    // Adjust days if current date is smaller than user date
    if (currentDate < userDate) {
        currentDate += new Date(currentYear, currentMonth - 1, 0).getDate();
        currentMonth -= 1;
    }

    // Adjust months if current month is smaller than user month
    if (currentMonth < userMonth) {
        currentMonth += 12;
        currentYear -= 1;
    }

    let diffDate = currentDate - userDate;
    let diffMonth = currentMonth - userMonth;
    let diffYear = currentYear - userYear;

    UpdateDom(diffYear, diffMonth, diffDate);
}

function ChangeColor() {
    let change = document.querySelectorAll(".change");
    change.forEach((number) => {
        number.classList.add("updatecolor");
    });
}

const calculateDate = (evn) => {
    evn.preventDefault();
    UserValiddate();
    calculateyear();
    ChangeColor();
};

curentDayfun();

document.querySelector("#year").addEventListener("input", (event) => {
    let validyear = event.target.value;
    isInvalidYear = validyear < 1900 || validyear > year;
});

document.querySelector("#day").addEventListener("input", (evn) => {
    let validDate = evn.target.value;
    isInvaliddate = validDate <= 0 || validDate >= 32;
});

document.querySelector("#month").addEventListener("input", (evn) => {
    let validmonth = evn.target.value;
    isvalidmonth = validmonth <= 0 || validmonth >= 13;
});

form.addEventListener("submit", calculateDate);
form.addEventListener("reset", (evn) => {
    evn.preventDefault();
    document.querySelector("#day").value = "";
    document.querySelector("#month").value = "";
    document.querySelector("#year").value = "";
});
