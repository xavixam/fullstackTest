import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const [step, setStep] = useState(1);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleTypeId: "",
    vehicleId: "",
    startDate: "",
    endDate: "",
  });

  // Cargar tipos de vehículos
  useEffect(() => {
    axios.get("http://localhost:3000/vehicleTypes").then((res) => {
      setVehicleTypes(res.data);
    });
  }, []);

  // Cargar vehículos según tipo
  useEffect(() => {
    if (formData.vehicleTypeId) {
      axios
        .get(
          `http://localhost:3000/vehicles?type=${formData.vehicleTypeId}`
        )
        .then((res) => setVehicles(res.data));
    } else {
      setVehicles([]); // Limpia si cambia tipo
    }
  }, [formData.vehicleTypeId]);

  const handleNext = () => {
    setError("");
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName) {
          setError("Please enter both first and last name");
          return;
        }
        break;
      case 2:
        if (!formData.wheels) {
          setError("Please select number of wheels");
          return;
        }
        break;
      case 3:
        if (!formData.vehicleTypeId) {
          setError("Please select a vehicle type");
          return;
        }
        break;
      case 4:
        if (!formData.vehicleId) {
          setError("Please select a vehicle");
          return;
        }
        break;
      case 5:
        if (!formData.startDate || !formData.endDate) {
          setError("Please select a start and end date");
          return;
        }
        break;
      default:
        break;
    }

    if (step === 5) {
      axios
        .post("http://localhost:3000/bookings/create", formData)
        .then((res) => alert("Booking created!"))
        .catch((err) => console.error(err));
    } else {
      setStep(step + 1);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1>Booking Form</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {step === 1 && (
        <div>
          <h2>What is your name?</h2>
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Number of wheels</h2>
          <label>
            <input
              type="radio"
              value="2"
              checked={formData.wheels === "2"}
              onChange={(e) => handleChange("wheels", e.target.value)}
            />
            2 Wheels
          </label>
          <label>
            <input
              type="radio"
              value="4"
              checked={formData.wheels === "4"}
              onChange={(e) => handleChange("wheels", e.target.value)}
            />
            4 Wheels
          </label>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Type of vehicle</h2>
          {vehicleTypes
            .filter((t) => Number(t.wheels) === Number(formData.wheels))
            .map((t) => (
              <label key={t.id}>
                <input
                  type="radio"
                  value={t.id}
                  checked={formData.vehicleTypeId === String(t.id)}
                  onChange={(e) =>
                    handleChange("vehicleTypeId", e.target.value)
                  }
                />
                {t.name}
              </label>
            ))}
        </div>
      )}

      <button onClick={handleNext}>{step === 5 ? "Submit" : "Next"}</button>
    </div>
  );
};

export default Form;