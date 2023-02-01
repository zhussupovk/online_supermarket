"use strict";

const basketCounterEl = document.querySelector(".cartIconWrap span");
const basketTotalEl = document.querySelector('.basketTotal span');
const featuredItemsEl = document.querySelector('.featuredItems');
const container = document.querySelector(".basketTotal");
const basketEl = document.querySelector(".basket");
const basketIconEl = document.querySelector(".cartIcon");
const basket = {};

featuredItemsEl.addEventListener("click", event => {
    if (!(event.target.closest('.addToCard'))) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCard(id, name, price);
});
basketIconEl.addEventListener("click", event => {
    basketEl.classList.toggle("hidden");
})

function addToCard(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id, name, price, count: 0};
    }
    basket[id].count++;
    basketTotalEl.textContent = getTotal().toString();
    basketCounterEl.textContent = getCounter().toString();
    renderProduct(id);
}

function getTotal() {
    return Object.values(basket).reduce((acc, product) => acc + product.count * product.price, 0);
}

function getCounter() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function renderProduct(id) {
    const basketRowEl = basketEl.querySelector(`[data-productId="${id}"]`)
    if (!basketRowEl) {
        render(id);
        return;
    }
    basketRowEl.querySelector(".count").textContent = basket[id].count;
    basketEl.querySelector(".total").textContent = (basket[id].count * basket[id].price).toString();
}

function render(id) {
    const productRow = `<div class="basketRow" data-productId="${id}">
                <div class="">${basket[id].name}</div>
                <div><span class="count">${basket[id].count}</span> шт</div>
                <div >${basket[id].price} $</div>
                <div class=""><span class="total">${basket[id].price}</span> $</div>
            </div>`;
    container.insertAdjacentHTML("beforebegin", productRow);
}
