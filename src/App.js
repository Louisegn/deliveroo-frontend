import { useState, useEffect } from "react";
import "./App.scss";
import "./assets/fonts.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";
import "./assets/reset.css";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  console.log(basket);
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

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <div className="App">
      <div className="header">
        <div className="top--header">
          <img src={logo} alt="" />
        </div>
        <div className="bottom--header">
          <div className="title--sub">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="pic--div">
            <img className="main-pic" src={data.restaurant.picture} alt="" />
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="menu-container">
          {data.categories.map((elem, index) => {
            if (elem.meals.length) {
              return (
                <div key={index}>
                  <h2> {elem.name}</h2>
                  <div className="menu--catego">
                    {elem.meals.map((meals, index) => {
                      return (
                        <button
                          key={index}
                          className="dish--container"
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
                                // console.log(index);
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
                          <div className="descript">
                            <h3>{meals.title}</h3>
                            <p className={meals.description && "details"}>
                              {meals.description}
                            </p>
                            <p className="price">{meals.price}</p>
                          </div>

                          {meals.picture && <img src={meals.picture} alt="" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            } else return null;
          })}
        </div>
        <div className="right-part">
          <div className="cart">
            {basket.length ? (
              <div className="no-empty">
                <div className="checkout">Valider mon panier</div>

                {basket.map((elem, index) => {
                  return (
                    <div key={index} className="cart--container">
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

                      <p className="title">{elem.meal}</p>
                      <p className="price">
                        {(elem.price * elem.quantity).toFixed(2)}€
                      </p>
                    </div>
                  );
                })}

                <div className="bottom-part">
                  <div className="sous-total">
                    <div>
                      <p>Sous-total</p>
                      <p>{basketPrice(0)}€</p>
                    </div>
                    <div>
                      <p>Frais de livraison</p>
                      <p>2,50€</p>
                    </div>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>{basketPrice(2.5)}€</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty">
                <div className="checkout">Valider mon panier</div>
                <div className="empty--cart">Votre panier est vide</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
