// Функція для фільтрації та відображення рядків таблиці відповідно до введеного фільтру
function searchTable(column) {
  let input = document.getElementById(
    column === 0 ? "nameInput" : column === 1 ? "surnameInput" : "pointsInput"
  );

  if (!input) return;

  let filter = input.value.toUpperCase();
  let table = document.getElementById("myTable");
  let rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    let td = rows[i].getElementsByTagName("td")[column];

    if (td) {
      let txtValue = td.textContent || td.innerText;
      rows[i].style.display = txtValue.toUpperCase().includes(filter)
        ? ""
        : "none";
    }
  }
}

// Функція для сортування рядків
function sortTable(column) {
  let table = document.getElementById("myTable");
  let rows = table.rows;
  let switching = true;

  while (switching) {
    switching = false;

    for (let i = 1; i < rows.length - 1; i++) {
      let x = rows[i].getElementsByTagName("td")[column];
      let y = rows[i + 1].getElementsByTagName("td")[column];

      if (x && y && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        break;
      }
    }
  }
}

// отрімання даніх з сайту
function fetchData() {
  return fetch("https://catfact.ninja/fact")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayAboutCat(factData, factColumn) {
  factColumn.innerHTML = factData;
}

function fetchFacts() {
  const factColumns = document.querySelectorAll(".fact-column");

  Promise.all(Array.from(factColumns).map(() => fetchData()))
    .then((facts) => {
      facts.forEach((data, index) => {
        const factColumn = factColumns[index];
        displayAboutCat(data.fact, factColumn);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.getElementById("fetchButton").addEventListener("click", fetchFacts);

//Зменшення нав
function toggleMenuSize() {
  let sidebar = document.getElementById("mySidebar");
  let button = document.getElementById("toggleButton");
  let items = document.querySelectorAll(".visibility");

  sidebar.classList.toggle("w3-small");
  sidebar.style.width = sidebar.classList.contains("w3-small")
    ? "50px"
    : "300px";

  button.innerHTML = sidebar.classList.contains("w3-small") ? "-" : "+";

  // Змінюємо видимість елементів
  items.forEach((item) => {
    item.classList.toggle("hidden");
  });
}
