var firstNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var emailInput = document.getElementById("email");
var categoryInput = document.getElementById("category");
var searchInput = document.getElementById("search");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

if (localStorage.getItem("allPersons") == null) {
  allPersons = [];
} else {
  allPersons = JSON.parse(localStorage.getItem("allPersons"));
  showPersons();
}

function addPerson() {
  var person = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    category: categoryInput.value,
  };

  allPersons.push(person);
  showPersons();
  localStorage.setItem("allPersons", JSON.stringify(allPersons));

  clearForm();
}

function clearForm() {
  firstNameInput.value = null;
  lastNameInput.value = null;
  emailInput.value = null;
  categoryInput.value = null;
}

function showPersons() {
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  for (var i = 0; i < allPersons.length; i++) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${allPersons[i].firstName}</td>
    <td>${allPersons[i].lastName}</td>
    <td>${allPersons[i].email}</td>
    <td>${allPersons[i].category}</td>
    <td><button onclick="deletePerson(${i})" class="btn btn-danger">Delete</button></td>
    <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>

    `;
    tbody.appendChild(tr);
  }
}

function deletePerson(index) {
  allPersons.splice(index, 1);
  showPersons();
  localStorage.setItem("allPersons", JSON.stringify(allPersons));
}

function searchPerson() {
  var term = searchInput.value;
  var cartona = ``;
  for (var i = 0; i < allPersons.length; i++) {
    if (allPersons[i].firstName.toLowerCase().includes(term.toLowerCase())
    || allPersons[i].lastName.toLowerCase().includes(term.toLowerCase())
    || allPersons[i].email.toLowerCase().includes(term.toLowerCase())
    || allPersons[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      cartona += `
      <tr>
      <td>${allPersons[i].firstName}</td>
      <td>${allPersons[i].lastName}</td>
      <td>${allPersons[i].email}</td>
      <td>${allPersons[i].category}</td>
      <td><button onclick="deletePerson(${i})" class="btn btn-danger">Delete</button></td>
      <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
      </tr>
      `;
    }
  }
  document.getElementById("tbody").innerHTML = cartona;
}

// set form values for update
function setFormForUpdate(index) {
  // save index so we can use it later
  updateIndex = index;
  // hide add button and show update button
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

  // set form values to current person
  firstNameInput.value = allPersons[index].firstName;
  lastNameInput.value = allPersons[index].lastName;
  emailInput.value = allPersons[index].email;
  categoryInput.value = allPersons[index].category;
}

// update person in array
function updatePerson() {
  // show add button and hide update button
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  // update person in array
  allPersons[updateIndex].firstName = firstNameInput.value;
  allPersons[updateIndex].lastName = lastNameInput.value;
  allPersons[updateIndex].email = emailInput.value;
  allPersons[updateIndex].category = categoryInput.value;

  // save updated array to local storage
  localStorage.setItem("allPersons", JSON.stringify(allPersons));
  // show updated list
  showPersons();
  // clear form
  clearForm();
}
