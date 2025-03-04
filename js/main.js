function fetchApi(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            fetch(data)
                .then(res => res.json())
                .then(data => resolve(data))
        }, 1000)
    })
}

const fetchData = async () => {
    const data = await fetchApi('assets/data/data.json');
    return data;
}

async function renderCardBody() {
    const products = await fetchData();
    const container = document.getElementsByClassName('.shopContainer');
    products.forEach(item => {
        const card = document.createElement('div');
        card.setAttribute('class', 'shopItem');
        card.innerHTML = `
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">${item.price}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
        </div>
        `;
        container.appendChild(card);

    });
}
renderCardBody();