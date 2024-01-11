import { useCallback } from "react";
import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import Card from "./Components/Card";
import CardForm from "./Components/CardForm";

function App() {
  const [cardDetails, setCardDetails] = useState({
    firstName:"Darshan",
    lastName:"Khairnar",
    address:"Anand Nagar, Soygaon, Malegaon"
  });

  const formSubmitCallback = useCallback((cardDetails) => {
    setCardDetails(cardDetails);
  });

  return (
    <>
      <div className="container p-5 vw-100 vh-100">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card-form">
              <CardForm
                formHandler={formSubmitCallback}
                details={cardDetails}
              />
            </div>
          </div>
          <div className="col-6">
          <div className="card-box">
              <Card cardDetails={cardDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
