import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const appSettings = {
  databaseURL: "https://shopping-c73ef-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
let shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);
  formReset();

  console.log(`${inputValue} added to database !`);
});

onValue(shoppingListInDB, function (snapshot) {
  let dbSnapshot = snapshot.val();
  let itemsArray = Object.entries(dbSnapshot);
  clearShoppingListEl();
  itemsArray.forEach((currentItem) => {
    let currentItemId = currentItem[0];
    let currentItemValue = currentItem[1];
    addList(currentItem);
  });
});

const formReset = () => {
  inputFieldEl.value = "";
};

const addList = (item) => {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
};

const clearShoppingListEl = () => {
  shoppingListEl.innerHTML = "";
};
