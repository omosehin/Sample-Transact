const baseUrl = " http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/";
// const baseUrl = require('./baseUrl')

let errorId = document.getElementById("error");
let errorMsg = document.getElementById("errorMsg");
let Prev = document.getElementById("Prev");
let Next = document.getElementById("Next");

let pageNumber = 1;
const pageLimit = 10;

let getData = false;
const tableHeader = [
  { Title: "", Url: "1654", Avatar: "Parco", Action: "", View: "" }
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let cellContent = null;
      if (key === "avatar") {
        let img = document.createElement("img");
        img.src = element[key];
        cellContent = img;
      } else if (key === "buttonDelete") {
        let buttonDel = document.createElement("button");
        let buttontextDel = document.createTextNode("delete");
        buttonDel.appendChild(buttontextDel);
        buttonDel.setAttribute("class", "delButton");
        cellContent = buttonDel;
      } else if (key === "buttonview") {
        let buttonVie = document.createElement("button");
        let buttontextDel = document.createTextNode("View");
        buttonVie.appendChild(buttontextDel);
        buttonVie.setAttribute("class", "viewButton");
        buttonVie.classList.add("warrior");
        cellContent = buttonVie;
      } else {
        cellContent = document.createTextNode(element[key]);
      }

      cell.appendChild(cellContent);
    }
  }
}

let table = document.querySelector("table");

let data = Object.keys(tableHeader[0]);
generateTableHead(table, data);

const fetchSearchTopStories = (pageNumber, pageLimit = 0) => {
  fetch(baseUrl + `/news?page= ${pageNumber}&limit=${pageLimit}`)
    .then(res => res.json())
    .then(data => {
      let dataArr = data.map(
        ({ title, url, avatar, buttonDelete, buttonview }) => {
          return {
            title,
            url,
            avatar,
            buttonDelete,
            buttonview
          };
        }
      );
      getData = true;
      generateTable(table, dataArr);
      if (data) {
        errorId.style.display = "none";
      }
      if (!data) {
        Next.style.display = "none";
        Prev.style.display = "none";
      }
    })
    .catch(error => {
      text = document.createTextNode("Failed to fetch");
      errorMsg.appendChild(text);
      if (error) {
        Next.style.display = "none";
        Prev.style.display = "none";
      }
    });
};
window.addEventListener("load", fetchSearchTopStories(1, 10));

Next.addEventListener("click", () => {
  fetchSearchTopStories(pageNumber++, 10);
});
if (pageNumber <= 2) {
  Prev.style.disabled = true;
}
Prev.addEventListener("click", () => {
  fetchSearchTopStories(pageNumber--, 10);
});

