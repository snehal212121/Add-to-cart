let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

// Show the product list by default
document.getElementById('login').style.display = 'none';
document.getElementById('product-list').style.display = 'block';
document.getElementById('cart').style.display = 'none';

function login(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'snehal' && password === 'kadam') {
        isLoggedIn = true; 
        sessionStorage.setItem('isLoggedIn', 'true'); 
        alert('Login successful!');
        document.getElementById('login').style.display = 'none';
        document.getElementById('product-list').style.display = 'block';
    } else {
        alert('Invalid username or password');
    }
}

function addToCart(productName, productPrice, productImage) {
    if (!isLoggedIn) {
        alert('Please log in to add items to your cart.');
        document.getElementById('login').style.display = 'block'; 
        document.getElementById('product-list').style.display = 'none'; 
        return; 
    }

    const product = { name: productName, price: productPrice, image: productImage, quantity: 1 }; 
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}

function viewCart() {
    if (!isLoggedIn) {
        alert('Please log in to view your cart.');
        document.getElementById('login').style.display = 'block'; 
        document.getElementById('product-list').style.display = 'none'; 
        return; 
    }

    document.getElementById('product-list').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    displayCart();
}

function goBack() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('product-list').style.display = 'block';
}

function goHome() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('product-list').style.display = 'block';
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-product-image">
            <span>${item.name} - $${item.price} x <span class="quantity">${item.quantity}</span></span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        `;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity; 
    });

    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function updateQuantity(index, change) {
    const product = cart[index];
    product.quantity += change; 

    if (product.quantity < 1) {
        product.quantity = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function resetCart() {
    cart = []; 
    localStorage.removeItem('cart'); 
    displayCart(); 
}

function logout() {
    isLoggedIn = false; 
    sessionStorage.removeItem('isLoggedIn'); 
    alert('You have been logged out.');
    goHome(); // Redirect to home (product list)
}