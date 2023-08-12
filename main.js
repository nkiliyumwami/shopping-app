import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

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
  //Check if there are items in snapshot.. then iterate
  if (snapshot.exists()) {
    let dbSnapshot = snapshot.val();
    let itemsArray = Object.entries(dbSnapshot);
    clearShoppingListEl();
    itemsArray.forEach((currentItem) => {
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      addItemToShoppingList(currentItem);
    });
  } else {
    shoppingListEl.innerHTML = "No items here ... yet!";
  }
});

const formReset = () => {
  inputFieldEl.value = "";
};

const addItemToShoppingList = (item) => {
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  //delete an item by clicling on it
  newEl.addEventListener("click", function () {
    //get the location of id of element you want to delete
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    //remove the item by it ID
    remove(exactLocationOfItemInDB);
  });
  shoppingListEl.append(newEl);
};

const clearShoppingListEl = () => {
  shoppingListEl.innerHTML = "";
};
