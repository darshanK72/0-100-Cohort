import { useMemo } from "react";
import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  const [number, setNumber] = useState(0);
  const [count,setCount] = useState(0);

  let sum = useMemo(() => {
    let x = 0;
    for (let i = 1; i <= number; i++) {
      x += i;
    }
    return x;
  },[number])


  return (
    <>
      <div className="container p-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="number" className="form-label">
                Number
              </label>
              <input
                type="text"
                className="form-control"
                name="number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="sum">{sum}</div>
            <div className="counter">
              <button onClick={() => setCount(count + 1)}>{count}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
