import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("useEffect");

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
  // console.log(data);
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
                            <div key={index} className="menu-div1">
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else return null;
              })}
            </div>
            <div className="basket"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
