let clickedItem;
let loginDisplay;

const setupListenersAndInitPage = () => {
    loginDisplay = document.getElementById('loginDisplay');
    updateUserDisplay();
    createForm = document.getElementById('createForm');
    createForm.addEventListener("click", initCreateFormCollapsible );
    fillTable();
    createButton.addEventListener('click', createItem );
}

window.addEventListener('DOMContentLoaded', setupListenersAndInitPage);

const initCreateFormCollapsible = (event) => {
    const block = event.target;
    block.classList.toggle("active-collaps");
    const content = block.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}

// returns currently connected user's id
const getUser = async () => {
    const userResponse = await fetch('/user/me', { method :'GET' });
    if (userResponse.ok) {
        const user = await userResponse.json();
        return user;
    }
}

// initializes and updates user's name and owned money when relevant
const updateUserDisplay = async () => {
    const user = await getUser();
    let displayString;
    if (user) {
        displayString = `<strong>${user.login}</strong>.\nVous avez <strong>${user.money}€</strong>`;
        loginDisplay.innerHTML = `Bienvenue, ${displayString}.`;
    }
}

// fetch GET all items, builds other user's entries first, then current user's entries
const fillTable = async () => {
  const itemsTable = document.getElementById('itemslist');
  itemsTable.textContent = '';
  const allItemsResponse = await fetch('/itemsrest/', { method :'GET' });
  if (allItemsResponse.ok) {
    let allitems = await allItemsResponse.json();
    if (allitems.length == 0) {
        itemsTable.appendChild(buildTD("Aucun objet actuellement en vente", 'delete'));
    }
    else {
        const user = await getUser();
        if (user) {
            allitems.filter(item => item.soldBy != user._id)
                    .forEach(item => {
                        const itemElement = buildItemElement(item, user);
                        itemsTable.appendChild(itemElement);
                    });
            // redundant, but forces display of owned items at the bottom of the list
            allitems.filter(item => item.soldBy == user._id)
                    .forEach(item => {
                        const itemElement = buildItemElement(item, null);
                        itemsTable.appendChild(itemElement);
                    });
        } else {
          loginDisplay.textContent(`Vous devez être connecté pour accéder aux annonces!`);
        }
    }
  } else {
    const error = await allItemsResponse.json();
    console.log(`error : ${error.message}`);
  }
}

// fetch PUT to buy one item with given item id, updates relevant users (credits seller, debits buyer)
const buyItem = async (itemId) => {
      const requestOptions = { method :'PUT',
                               headers : { "Content-Type": "application/json" } };
      const response = await fetch(`/itemsrest/${itemId}`, requestOptions);
      const updatedInfo = await response.json();
      moveItemLineUp(itemId);
      updateUserDisplay();
      updateTable();
}

// fetch DELETE to delete one item with given item id
const deleteItem = async (itemId, button) => {
      const response = await fetch(`/itemsrest/${itemId}`, { method :'DELETE' });
      const received = await response.json();
      updateTable();
}

// fetch POST to create one item if price isn't a negative value
const createItem = async () => {
    if (price.value >= 0) {
      const user = await getUser();
      if (user) {
        const newItem = { title : title.value, soldBy : '', price : price.value, image : image.value  };
        const body = JSON.stringify(newItem);
        const requestOptions = {
                                  method :'POST',
                                  headers : { "Content-Type": "application/json" },
                                  body : body
                                };
        const itemResponse = await fetch('/itemsrest', requestOptions);
        if (itemResponse.ok) {
          const item = await itemResponse.json();
          answer.textContent = `Votre annonce pour "${item.title}" a été créée!`;
        }
        else {
          const error = await itemResponse.json();
          answer.textContent = `error : ${error.message}`;
        }
      clearInputs();
      updateTable();
      }
    } else {
        answer.textContent = `Le prix ne peut pas être une valeur négative...`;
    }
}

const updateTable = () => {
  fillTable();
}

// utility functions
const buildItemElement =  (item, user) => {
  const itemElement = document.createElement('tr');
  itemElement.className = 'item';
  itemElement.setAttribute('data-id' , item._id);

  createImage(item, itemElement);

  itemElement.appendChild(buildTD(item.title, 'title'));
  itemElement.appendChild(buildTD(`${item.price}€`, 'price'));

  if(!user) {
    const deleteButton = buildButton('Supprimer', 'delete');
    deleteButton.addEventListener('click', () => deleteItem(item._id, deleteButton));
    itemElement.appendChild(buildTDForHTMLElement(deleteButton, 'button'));
  }
  else {
    if(user.money >= item.price) {
        const updateButton = buildButton("Acheter", 'buybutton');
        updateButton.addEventListener('click', () => buyItem(item._id));
        itemElement.appendChild(buildTDForHTMLElement(updateButton, 'button'));
    }
  }
  return itemElement;
}

const buildTD = (content, className) => {
  const TDelement = document.createElement('td');
  TDelement.textContent = content;
  TDelement.className = className;
  return TDelement;
}

const buildTDForHTMLElement = (content, className) => {
    const TDelement = document.createElement('td');
    TDelement.className = className;
    TDelement.appendChild(content);
    return TDelement;
}

const buildButton = (label, className) => {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = label;
  return button;
}

const moveItemLineUp = (itemID) => {
    const table = document.getElementById("itemslist");
    const cells = Array.from(table.getElementsByTagName("tr"));
    const itemLine = cells.find(line => line.getAttribute('data-id') === itemID);
    const innerCells = itemLine.children;
    lastBought.innerHTML = `Dernier achat : ${innerCells[1].textContent} à ${innerCells[2].textContent}.`;
}

const createImage = (item, itemElement) => {
    itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemElement.appendChild(buildTDForHTMLElement(itemImage, 'image'));
}

const clearInputs = () => {
    title.value = "";
    price.value = "";
    image.value = "";
}
