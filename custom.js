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
  fetch("https://catfact.ninja/fact")
    .then((response) => response.json())
    .then((data) => {
      displayAbouCat(data.fact);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayAbouCat(factData) {
  const factAboutCat = document.getElementById("factAboutCat");
  factAboutCat.innerHTML = "<strong>FACT :</strong> " + factData;
}
document.getElementById("fetchButton").addEventListener("click", fetchData);

//Зменшення нав

function toggleMenuSize() {
  var sidebar = document.getElementById("mySidebar");
  sidebar.classList.toggle("w3-small");
  sidebar.style.width = sidebar.classList.contains("w3-small")
    ? "150px"
    : "300px";
}
