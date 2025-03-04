let items = [];
let cartItems = [];
const deleteIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC';

// CommonApi
function fetchApi(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            fetch(data)
                .then(res => res.json())
                .then(data => resolve(data))
        }, 500)
    })
}

// Services
const fetchData = async () => {
    items = await fetchApi('assets/data/data.json');
    renderCard();
}

const createCard = (data) => {
    const cardItem = document.createElement('div');
    cardItem.setAttribute('class', 'shopItem');

    const shopItemImg = document.createElement('div');
    shopItemImg.setAttribute('class', 'shopItem_image');
    shopItemImg.style.backgroundColor = data.color

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.name;

    const shopItemName = document.createElement('div');
    shopItemName.setAttribute('class', 'shopItem_name');
    shopItemName.innerHTML = data.name;

    const shopItemDescription = document.createElement('div');
    shopItemDescription.setAttribute('class', 'shopItem_description');
    shopItemDescription.innerHTML = data.description;

    const shopItemBottom = document.createElement('div');
    shopItemBottom.setAttribute('class', 'shopItem_bottom');

    const shopItemPrice = document.createElement('div');
    shopItemPrice.setAttribute('class', 'shopItem_price');
    shopItemPrice.innerHTML = `$${data.price}`;

    const shopItemButton = document.createElement('div');
    shopItemButton.setAttribute('class', 'shopItem_button');
    shopItemButton.style.opacity = 1;
    shopItemButton.style.cursor = 'pointer';
    shopItemButton.addEventListener('click', (e) => handleClickAddToCart(e, data.id)); 

    const shopItemButtonText = document.createElement('p');
    shopItemButtonText.innerHTML = 'Add to cart';

    shopItemButton.appendChild(shopItemButtonText);

    shopItemBottom.appendChild(shopItemPrice);
    shopItemBottom.appendChild(shopItemButton);
    shopItemImg.appendChild(img);

    cardItem.appendChild(shopItemImg);
    cardItem.appendChild(shopItemName);
    cardItem.appendChild(shopItemDescription);
    cardItem.appendChild(shopItemBottom);

    return cardItem;
}

function renderCard() {
    const cardItemLeft = document.querySelector('#cardBody-item-left');
    items.forEach((item)=> {
        cardItemLeft.appendChild(createCard(item));
    })
}


const handleClickAddToCart = (e, id) => {
    e.preventDefault();
    const selectedItem = items.find(item => item.id === id);
    const button = e.target.closest('.shopItem_button');
    if (!selectedItem) return;

    const existingItem = cartItems.find(cartItem => cartItem.id === id);
    if (existingItem) {
        return;
    } else {
        cartItems.push({ ...selectedItem, quantity: 1 }); 
        if (button) {
            button.style.opacity = 0.5;
            button.style.cursor = 'not-allowed';
            button.innerHTML = '<p>Added</p>';
        }
    }
    renderCart(); 
};


// Cart item
const renderCart = () => {
    const cartContainer = document.querySelector('#cardBody-item-right');
    cartContainer.innerHTML = ''; // Clear cart before re-rendering

    let totalAmount = 0;
    let totalItems = 0;

    cartItems.forEach(item => {
        totalAmount += item.price * item.quantity;
        totalItems += item.quantity;

        // Cart Item Container
        const cartItem = document.createElement('div');
        cartItem.setAttribute('class', 'cardItem');

        // Left Section (Image)
        const cartItemLeft = document.createElement('div');
        cartItemLeft.setAttribute('class', 'cardItem_left');

        const cartItemImageContainer = document.createElement('div');
        cartItemImageContainer.setAttribute('class', 'cardItem_image');
        cartItemImageContainer.style.backgroundColor = item.color; 

        const cartItemImg = document.createElement('img');
        cartItemImg.src = item.image;
        cartItemImg.alt = item.name;

        cartItemImageContainer.appendChild(cartItemImg);
        cartItemLeft.appendChild(cartItemImageContainer);

        const cartItemRight = document.createElement('div');
        cartItemRight.setAttribute('class', 'cardItem_right');

        const cartItemName = document.createElement('div');
        cartItemName.setAttribute('class', 'cardItem_name');
        cartItemName.innerText = item.name;

        const cartItemPrice = document.createElement('div');
        cartItemPrice.setAttribute('class', 'cardItem_price');
        cartItemPrice.innerHTML = `<span>$</span><span>${item.price.toFixed(2)}</span>`;

        // Actions (Quantity and Remove)
        const cartItemActions = document.createElement('div');
        cartItemActions.setAttribute('class', 'cartItem_actions');

        const cartItemCount = document.createElement('div');
        cartItemCount.setAttribute('class', 'cartItem_count');

        const minusBtn = document.createElement('div');
        minusBtn.setAttribute('class', 'cartItem_button');
        minusBtn.innerText = '-';
        // minusBtn.addEventListener('click', () => updateCartItemQuantity(item.id, -1));

        const quantityDisplay = document.createElement('div');
        quantityDisplay.setAttribute('class', 'cartItem_number');
        quantityDisplay.innerText = item.quantity;

        const plusBtn = document.createElement('div');
        plusBtn.setAttribute('class', 'cartItem_button');
        plusBtn.innerText = '+';
        // plusBtn.addEventListener('click', () => updateCartItemQuantity(item.id, 1));

        cartItemCount.appendChild(minusBtn);
        cartItemCount.appendChild(quantityDisplay);
        cartItemCount.appendChild(plusBtn);

        cartItemActions.appendChild(cartItemCount);

        const cartItemRemove = document.createElement('div');
        cartItemRemove.setAttribute('class', 'cartItem_remove');

        const removeImg = document.createElement('img');
        removeImg.src = deleteIcon;
        removeImg.alt = 'Remove Item';
        // removeImg.addEventListener('click', () => removeFromCart(item.id));

        cartItemRemove.appendChild(removeImg);

        cartItemActions.appendChild(cartItemRemove);

        cartItemRight.appendChild(cartItemName);
        cartItemRight.appendChild(cartItemPrice);
        cartItemRight.appendChild(cartItemActions);

        cartItem.appendChild(cartItemLeft);
        cartItem.appendChild(cartItemRight);

        cartContainer.appendChild(cartItem);
    });

    document.querySelector('.card_amount').innerText = `$${totalAmount.toFixed(2)}`;
    document.querySelector('.cardTop div').innerText = `Total: ${totalItems}`;
};


fetchData();