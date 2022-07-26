import { useState, useEffect } from "react";
import "./App.css";
import "./assets/fonts.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  // const [total, setTotal] = useState(0);

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
    return total + num;
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
              <img className="mainPic" src={data.restaurant.picture} alt="" />
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
                                // console.log("YOO", basket[index].meal);
                                // console.log("HEYY", meals.title);

                                // if (!basket[index]) {
                                //   console.log(index);
                                //   // if (!basket.length) {
                                //   console.log("yess");

                                //   const newBasket = [...basket];
                                //   newBasket.push({
                                //     meal: meals.title,
                                //     price: meals.price,
                                //     quantity: 1,
                                //   });
                                //   setBasket(newBasket);
                                // } else if (
                                //   basket[index].meal.indexOf(meals.title) !== -1
                                // ) {
                                //   const newBasket = [...basket];
                                //   newBasket[index].quantity++;
                                //   setBasket(newBasket);
                                // } else {
                                //   console.log("ehh noop");
                                // }

                                if (basket.length) {
                                  // console.log(index);
                                  // if (!basket.length) {
                                  console.log("yess");
                                  if (
                                    basket[index].meal.indexOf(meals.title) !==
                                    -1
                                  ) {
                                    console.log("heyyoo");
                                    const newBasket = [...basket];
                                    newBasket[index].quantity++;
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
                                  className="menuPic"
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
                      <p>{elem.price * elem.quantity} €</p>
                    </div>
                  </div>
                );
              })}
              <div className="sous-total">
                <p>Sous-total</p>
                <p>{basketPrice(0)}</p>
                <p>Frais de livraison</p>
                <p>2,50 €</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p>{basketPrice(2.5)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
