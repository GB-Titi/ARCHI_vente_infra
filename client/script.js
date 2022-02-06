console.log("go");
// const button = document.querySelector("button");
let cart = {
  items: []
}

function addToCart(itemId) {
  cart.items.push({
    id: itemId,
    quantity: 1
  });

  console.log(cart);

  const panier = document.getElementById('panier')
  panier.innerHTML += ` <p> id de l'item ${itemId} : quantité de l'item : 1 </p> `
}


function checkout() {
  // let cart = {
  //   items: [
  //     {
  //       id: 1,
  //       quantity: 2,
  //     },
  //     {
  //       id: 2,
  //       quantity: 3,
  //     },
  //   ],
  // }
  console.log(cart);

  fetch("http://localhost:3000/create-checkout-session", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({
      url
    }) => {
      // console.log("url", url);
      window.location = url
    })
    .catch((e) => console.error(e.error));
};


function populateArticles() {
  //BDD fetch
  const articleList = document.getElementById('articleList')
  //BDD convert to obj
  
  articleList.innerHTML += `<section class="product">
  <h2>${label}</h2>
  <p>${ref}</p>
  <button onclick="addToCart(${id})">Ajouter au panier</button>
</section>
`
}