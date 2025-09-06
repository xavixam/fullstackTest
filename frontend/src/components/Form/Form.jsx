import "./Form.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

const Form = () => {
    const [step, setStep] = useState(1);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        wheels: "",
        vehicleTypeId: "",
        vehicleId: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        axios.get("http://localhost:3000/vehicleTypes")
            .then((res) => {
                // console.log("Vehicle types loaded:", res.data);
                setVehicleTypes(res.data);
            })
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        if (formData.vehicleTypeId) {
            axios
                .get(
                    `http://localhost:3000/vehicles?type=${formData.vehicleTypeId}`
                )
                .then((res) => setVehicles(res.data));
        } else {
            setVehicles([]);
        }
    }, [formData.vehicleTypeId]);

    const handleNext = () => {
        setError("");
        setSuccess("");

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
                .then((res) => {
                    setSuccess("Booking created successfully!");
                    setError("");
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.error) {
                        setError(err.response.data.error);
                    } else {
                        setError("There was a problem creating the booking.");
                    }
                    setSuccess("");
                });
        } else {
            setStep(step + 1);
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex justify-center flex-col">
            <h1>Booking Form</h1>

            {error && <Alert severity="error" className="mb-4">{error}</Alert>}
            {success && <Alert severity="success" className="mb-4">{success}</Alert>}

            {step === 1 && (
                <div className="flex flex-col gap-10 p-8 w-full items-center">
                    <h2>What is your name?</h2>
                    <div className="flex flex-col gap-4">
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-4 p-4 items-center">
                    <FormLabel id="wheels-radio-group-label">Number of wheels</FormLabel>
                    <RadioGroup
                        aria-labelledby="wheels-radio-group-label"
                        name="wheels"
                        value={formData.wheels}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                wheels: value,          // actualizar wheels
                                vehicleTypeId: "",      // resetear tipo de vehículo
                                vehicleId: ""           // resetear vehículo específico
                            }));
                        }}
                        row
                    >
                        <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
                        <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
                    </RadioGroup>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col gap-4 p-4 items-center">
                    <FormLabel id="vehicle-type-radio-group-label">Type of vehicle</FormLabel>
                    <RadioGroup
                        aria-labelledby="vehicle-type-radio-group-label"
                        name="vehicleTypeId"
                        value={formData.vehicleTypeId}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                vehicleTypeId: value,
                                vehicleId: ""   // Reset selected vehicle
                            }));
                        }}
                        row
                    >
                        {vehicleTypes
                            .filter(t => t.wheels === formData.wheels)
                            .map(t => (
                                <FormControlLabel
                                    key={t.id}
                                    value={t.id.toString()}
                                    control={<Radio />}
                                    label={t.name}
                                />
                            ))}
                    </RadioGroup>
                </div>
            )}

            {step === 4 && (
                <div className="flex flex-col gap-4 p-4 items-center">
                    <FormLabel id="vehicle-radio-group-label">Specific Model</FormLabel>

                    {vehicles.length === 0 ? (
                        <p>No vehicles available for this type</p>
                    ) : (
                        <RadioGroup
                            aria-labelledby="vehicle-radio-group-label"
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    vehicleId: value
                                }));
                            }}
                            row
                        >
                            {vehicles
                                .filter(v => String(v.vehicleTypeId) === formData.vehicleTypeId)
                                .map(v => (
                                    <FormControlLabel
                                        key={v.id}
                                        value={v.id.toString()}
                                        control={<Radio />}
                                        label={v.name}
                                    />
                                ))}
                        </RadioGroup>
                    )}
                </div>
            )}

            {step === 5 && (
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <div className="flex flex-col gap-4 p-4 items-center">
                        <DatePicker
                            label="Start Date"
                            value={formData.startDate ? new Date(formData.startDate) : null}
                            onChange={(newValue) =>
                                setFormData(prev => ({ ...prev, startDate: newValue }))
                            }
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="dd/MM/yyyy"
                        />

                        <DatePicker
                            label="End Date"
                            value={formData.endDate ? new Date(formData.endDate) : null}
                            onChange={(newValue) =>
                                setFormData(prev => ({ ...prev, endDate: newValue }))
                            }
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="dd/MM/yyyy"
                        />
                    </div>
                </LocalizationProvider>
            )}

            <div>
                <Button variant="contained" onClick={handleNext}>{step === 5 ? "Submit" : "Next"}</Button>
            </div>
        </div>
    );
};

export default Form;