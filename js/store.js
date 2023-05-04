let $ = document

let allProducts = [
    { id: 1, name: 'Album', price: 14, src: "./images/Album 1.png", count: 1 },
    { id: 2, name: 'T-Shirt', price: 19, src: "./images/Shirt.png", count: 1 },
    { id: 3, name: 'Coffee Cup', price: 5, src: "./images/Cofee.png", count: 1 },
    { id: 4, name: 'Album 2', price: 9, src: "./images/Album 2.png", count: 1 },
    { id: 5, name: 'Album 3', price: 14, src: "./images/Album 3.png", count: 1 },
    { id: 6, name: 'Album 4', price: 5, src: "./images/Album 4.png", count: 1 }
]

let userBasket = []

const allShopItemsElem = $.querySelector('.shop-items')
const UserBasketElem = $.querySelector('.cart-items')
const totalPriceElem = $.querySelector('.cart-total-price')
const purchaseBtn = $.querySelector('.btn-purchase')

function addAllProducts(allUserProducts) {
    allShopItemsElem.innerHTML = ''

    allUserProducts.forEach(function (product) {

        allShopItemsElem.insertAdjacentHTML('beforeend', '<div class="shop-item" ><span class="shop-item-title">' + product.name + '</span><img class="shop-item-image" src=" ' + product.src + ' " /><div class="shop-item-details"><span class="shop-item-price">' + '$' + product.price + '</span><button class="btn btn-primary shop-item-button" type="button" onclick="addProductToBasket(' + product.id + ')">ADD TO CART</button></div></div >')

    })
}

function addProductToBasket(productId) {
    let mainProduct = allProducts.find(function (product) {
        return productId === product.id
    })

    userBasket.push(mainProduct)
    addUserProductsToDom(userBasket)
    calcTotalPrice(userBasket)
}

function addUserProductsToDom(allUserProducts) {
    UserBasketElem.innerHTML = ''
    allUserProducts.forEach(function (product) {
        UserBasketElem.insertAdjacentHTML('beforeend', '<div class="cart-row"><div class="cart-item cart-column"><img class="cart-item-image" src="' + product.src + '" width="100" height="100"><span class="cart-item-title">' + product.name + '</span></div><span class="cart-price cart-column">' + product.price + '</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" id="' + product.id + '" type="number" value="1" onchange="changeInputValue(' + product.id + ')"><button class="btn btn-danger" type="button" onclick="removeUserProduct(' + product.id + ')">REMOVE</button></div></div>')
    })
}

function removeUserProduct(productId) {
    userBasket = userBasket.filter(function (product) {
        return productId !== product.id
    })
    addUserProductsToDom(userBasket)
    calcTotalPrice(userBasket)
}

function calcTotalPrice(allUserProducts) {
    let totalPrice = 0
    allUserProducts.forEach(function (product) {
        totalPrice += product.price * product.count
    })
    totalPriceElem.innerHTML = '$' + totalPrice
}

function changeInputValue(productId) {
    let mainProduct = userBasket.find(function (product) {
        return productId === product.id
    })
    let mainProductId = $.getElementById(productId)

    if (mainProductId.value < 1) {
        mainProductId.value = 1
    }

    mainProduct.count = mainProductId.value
    calcTotalPrice(userBasket)
}

purchaseBtn.addEventListener('click', function () {
    userBasket = []
    addUserProductsToDom(userBasket)
    calcTotalPrice(userBasket)
})

addAllProducts(allProducts)