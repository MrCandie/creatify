"use strict";
const sideBar = document.querySelector(".side-bar");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const navBar = document.querySelector(".nav-bar");
const dashBoard = document.querySelector(".transaction-history");
const totalIncome = document.querySelector(".total-income");
const totalPayout = document.querySelector(".total-payout");
const inputUsername = document.querySelector(".login-username");
const inputPin = document.querySelector(".login-pin");
const loginBtn = document.querySelector(".btn-login");

const account1 = {
  owner: "Akinwumi Adekanmi",
  username: "candie",
  pin: 1111,
  transactions: [100, 324, -543, 54, -100, 1000, 300, 109000],
  movementsDates: [
    "2022-05-01T13:15:33.035Z",
    "2022-06-25T06:04:23.907Z",
    "2022-07-25T14:18:46.235Z",
    "2022-08-05T16:33:06.386Z",
    "2022-08-20T14:43:26.374Z",
    "2022-08-25T18:49:59.371Z",
    "2022-08-26T12:01:20.894Z",
  ],
  currency: "USD",
};

const account2 = {
  owner: "Mister Candie",
  username: "mc",
  pin: 2222,
  transactions: [170, 224, -943, 524, -400, 19000, 1234, -6758],
  movementsDates: [
    "2022-08-22T21:31:17.178Z",
    "2022-08-24T07:42:02.383Z",
    "2022-08-25T09:15:04.904Z",
    "2022-08-25T10:17:24.185Z",
    "2022-08-25T14:11:59.604Z",
    "2022-08-26T17:01:17.194Z",
    "2022-08-26T23:36:17.929Z",
    "2022-08-26T10:51:36.790Z",
  ],
  currency: "EUR",
};

const accounts = [account1, account2];

// display total sales
const displayTotalSales = function (sales) {
  let balance = sales
    .filter((sale) => sale > 0)
    .reduce((acc, sale) => acc + sale);
  totalIncome.textContent = `$${balance}`;
};

displayTotalSales(account2.transactions);

// display total payout
const displayTotalPayout = function (pay) {
  let payout = pay.filter((pay) => pay < 0).reduce((acc, pay) => acc + pay);
  totalPayout.textContent = `$${Math.abs(payout)}`;
};
displayTotalPayout(account2.transactions);

const formattedTransactionDate = function (date) {
  const calcDaysPassed = (day1, day2) =>
    Math.round(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = `${date.getFullYear()}`;
  // return `${day}/${month}/${year}`;
  const locale = navigator.language;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayTransaction = function (acc) {
  dashBoard.innerHTML = "";
  acc.transactions.forEach((tra, i) => {
    const type = tra > 0 ? "Image Sold" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    // console.log(date);

    const displayTransactionDate = formattedTransactionDate(date);

    const html = `
      <div class="transact1">
      <p>${type}</p>
      <p>${displayTransactionDate}</p>
      <span>$${Math.abs(tra)}</span>
    </div>
    <hr />
      `;

    dashBoard.insertAdjacentHTML("afterbegin", html);
  });
};
displayTransaction(account1);

// login functionality
let currentAccount;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputPin.value)) {
    window.location.href = "dashboard.html";
    // display transactions
    displayTransaction(currentAccount.transactions);

    // display totalIncome
    displayTotalSales(currentAccount.transactions);
  }
});
function openMenu() {
  console.log("working");
  sideBar.classList.toggle("open-menu");
}
btn.addEventListener("click", function () {
  window.location.href = "profile.html";
});
btn1.addEventListener("click", function () {
  window.location.href = "profile.html";
});
btn2.addEventListener("click", function () {
  window.location.href = "login.html";
});

function openNav() {
  console.log("work");
  navBar.style.transform = "translateX(430px)";
}
function closeNav() {
  navBar.style.transform = "translateX(0px)";
}
