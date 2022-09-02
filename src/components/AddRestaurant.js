import "../css/style.css";
import React from "react";
import { useState } from "react";

export default AddRestaurant;

function AddRestaurant() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [name, setName] = useState("");
  const [nit, setNit] = useState("");
  const [email, SetEmail] = useState("");

  const onName = (event) => {
    setName(event.target.value);
  };
  const onNit = (event) => {
    setNit(event.target.value);
  };
  const onEmail = (event) => {
    SetEmail(event.target.value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    setErr(null);

    console.log(name + " "+nit+" "+email)

    try {
      const response = await fetch("endpoint", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          nit: nit,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Registra un restaurante</h3>
      </div>
      <div className="form">
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="restaurantName">
              Nombre{" "}
            </label>
            <input
              className="form__input"
              type="text"
              id="restaurantName"
              placeholder="Nombre"
              onChange={onName}
            />
          </div>
          <div className="restaurantId">
            <label className="form__label" for="restaurantId">
              NIT{" "}
            </label>
            <input
              type="text"
              id="restaurantId"
              className="form__input"
              placeholder="NIT"
              onChange={onNit}
            />
          </div>
          <div className="restaurantEmail">
            <label className="form__label" for="restaurantEmail">
              Email{" "}
            </label>
            <input
              type="email"
              id="restaurantEmail"
              className="form__input"
              placeholder="Email"
              onChange={onEmail}
            />
          </div>
        </div>
        <div class="footer">
          <button type="submit" onClick={handleClick} class="btn">
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
