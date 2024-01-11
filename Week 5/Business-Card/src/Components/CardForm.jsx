import { useState } from "react";

function CardForm({formHandler,details}) {
  const [cardDetails, setCardDetails] = useState({
    firstName: details.firstName,
    lastName: details.lastName,
    address: details.address,
  });

  function updateCardDetails(newDetails) {
    setCardDetails({ ...cardDetails, ...newDetails });
  }

  function submitEventHandler(event){
    event.preventDefault();
    formHandler(cardDetails)
  }

  return (
    <>
      <form
        className="card-form p-2"
        onSubmit={submitEventHandler}
      >
        <div className="input-item mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={cardDetails.firstName}
            onChange={(e) => updateCardDetails({ firstName: e.target.value })}
          />
        </div>
        <div className="input-item mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={cardDetails.lastName}
            onChange={(e) => updateCardDetails({ lastName: e.target.value })}
          />
        </div>
        <div className="input-item mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            name="address"
            value={cardDetails.address}
            onChange={(e) => updateCardDetails({ address: e.target.value })}
          />
        </div>
        <div className="input-item mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
}

export default CardForm;
