import { useState, useEffect } from "react";
import "./App.css";
import "./assets/fonts.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://deli-backend.herokuapp.com/");

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const basketPrice = (num) => {
    let total = 0;
    for (let i = 0; i < basket.length; i++) {
      total += basket[i].price * basket[i].quantity;
    }
    return (total + num).toFixed(2);
  };

  return (
    <div className="App">
      {isLoading === true ? (
        <h1>En cours de chargement</h1>
      ) : (
        <div>
          <header>
            <div>
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div>
              <img className="main-pic" src={data.restaurant.picture} alt="" />
            </div>
          </header>
          <div className="menu-basket">
            <div className="menu">
              {data.categories.map((elem, index) => {
                if (elem.meals.length) {
                  return (
                    <div key={index}>
                      <h2> {elem.name}</h2>
                      <div className="menu-container">
                        {elem.meals.map((meals, index) => {
                          return (
                            <button
                              key={index}
                              className="menu-div1"
                              onClick={() => {
                                if (basket.length) {
                                  // const valid = basket.find(
                                  //   (elem) => elem.meal === meals.title
                                  // );
                                  // console.log("VALID", valid);
                                  let test;

                                  for (let i = 0; i < basket.length; i++) {
                                    if (basket[i].meal === meals.title)
                                      test = basket[i];
                                  }
                                  // console.log("TEST", test);

                                  if (test) {
                                    console.log(index);
                                    const newBasket = [...basket];
                                    newBasket[basket.indexOf(test)].quantity++;
                                    setBasket(newBasket);
                                  } else {
                                    const newBasket = [...basket];
                                    newBasket.push({
                                      meal: meals.title,
                                      price: meals.price,
                                      quantity: 1,
                                    });
                                    setBasket(newBasket);
                                  }
                                } else {
                                  const newBasket = [...basket];
                                  newBasket.push({
                                    meal: meals.title,
                                    price: meals.price,
                                    quantity: 1,
                                  });
                                  setBasket(newBasket);
                                }
                              }}
                            >
                              <div
                                className={
                                  meals.picture ? "descript" : "descript-no-pic"
                                }
                              >
                                <h3>{meals.title}</h3>
                                <p className="meal-descript">
                                  {meals.description}
                                </p>
                                <p>{meals.price}</p>
                              </div>

                              {meals.picture && (
                                <img
                                  className="menu-pic"
                                  src={meals.picture}
                                  alt=""
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else return null;
              })}
            </div>
            <div className="basket">
              <div className="basket-head">Valider mon panier</div>

              {basket.map((elem, index) => {
                return (
                  <div key={index} className="all">
                    <div className="details">
                      <div className="counter">
                        <button
                          className="butt"
                          onClick={() => {
                            const newBasket = [...basket];
                            newBasket[index].quantity--;
                            if (newBasket[index].quantity === 0) {
                              newBasket.splice(index, 1);
                            }
                            setBasket(newBasket);
                          }}
                        >
                          -
                        </button>
                        <p>{elem.quantity}</p>
                        <button
                          className="butt"
                          onClick={() => {
                            const newBasket = [...basket];
                            newBasket[index].quantity++;
                            setBasket(newBasket);
                          }}
                        >
                          +
                        </button>
                      </div>

                      <p>{elem.meal}</p>
                      <p>{(elem.price * elem.quantity).toFixed(2)}€</p>
                    </div>
                  </div>
                );
              })}
              {basket.length ? (
                <div>
                  <div className="sous-total">
                    <div className="div1">
                      <p>Sous-total</p>
                      <p>{basketPrice(0)}€</p>
                    </div>
                    <div className="div2">
                      <p>Frais de livraison</p>
                      <p>2,50€</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>{basketPrice(2.5)}€</p>
                  </div>
                </div>
              ) : (
                <p className="empty">Votre panier est vide</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
