import React, { useState } from "react";
import "./Form.css";

const Form = () => {
  // State to manage loading state
  const [isLoading, setIsloading] = useState(false);
  // State to manage form data
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Fuel_Type: "",
    Seller_Type: "",
    Transmission: "",
    Owner: "",
  });
  // State to manage prediction result
  const [result, setResult] = useState("");
  // State to manage displaying result
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  // Function to handle the 'Predict Selling Price' button click
  const handlePredictClick = () => {
    const url = "http://localhost:5000/predict";
    setIsloading(true);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title1">Car Price Prediction</h1>
        <form>
          <div className="form-group">
            <label>Year of Purchase:</label>
            <input
              type="text"
              className="form-control"
              id="Year"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter Year of Purchase"
            />
          </div>
          <div className="form-group">
            <label>Present Price (in Lakhs):</label>
            <input
              type="text"
              className="form-control"
              id="Present_Price"
              name="Present_Price"
              value={formData.Present_Price}
              onChange={handleChange}
              placeholder="Enter Present Price (in Lakhs)"
            />
          </div>
          <div className="form-group">
            <label>Kilometers Driven:</label>
            <input
              type="text"
              className="form-control"
              id="Kms_Driven"
              name="Kms_Driven"
              value={formData.Kms_Driven}
              onChange={handleChange}
              placeholder="Enter Kilometers Driven"
            />
          </div>
          <div className="form-group">
            <label>Fuel Type:</label>
            <select
              className="form-control1"
              id="Fuel_Type"
              name="Fuel_Type"
              value={formData.Fuel_Type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Petrol</option>
              <option value="1">Diesel</option>
              <option value="2">CNG</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seller Type:</label>
            <select
              className="form-control1"
              id="Seller_Type"
              name="Seller_Type"
              value={formData.Seller_Type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Dealer</option>
              <option value="1">Individual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Transmission Type:</label>
            <select
              className="form-control1"
              id="Transmission"
              name="Transmission"
              value={formData.Transmission}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Manual</option>
              <option value="1">Automatic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number of Owners:</label>
            <input
              type="text"
              className="form-control"
              id="Owner"
              name="Owner"
              value={formData.Owner}
              onChange={handleChange}
              placeholder="Enter Number of Owners"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={!isLoading? handlePredictClick : null}
            >
              Predict Selling Price
            </button>
          </div>
          {showSpan && (
            <div className="result">
              <h4>
             {result && Object.keys(result).length!== 0? (
        <p>The Predicted Price is {Number(result).toFixed(1)} Lakhs</p>
      ) : (
        <p>Please fill out each field in the form completely</p>
      )}
              </h4>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;