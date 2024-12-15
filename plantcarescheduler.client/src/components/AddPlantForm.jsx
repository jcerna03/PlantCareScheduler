import React, { useState } from 'react';
import { addPlant } from '../services/plantService';

const AddPlantForm = ({ onClose, onPlantAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'succulent',
        wateringFrequencyDays: 0,
        lastWateredDate: new Date(),
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'wateringFrequencyDays'
                ? parseInt(value, 10)
                : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPlant(formData);
            alert('Plant added successfully!');
            onPlantAdded();
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding plant:', error);
            alert('Failed to add plant. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-6 text-start">
                        <label htmlFor="name">Plant Name</label>

                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-6 text-start">
                        <label htmlFor="type">Plant Type</label>
                    </div>
                    <div className="col-6">
                        <select
                            className="form-control"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="succulent">Succulent</option>
                            <option value="tropical">Tropical</option>
                            <option value="herb">Herb</option>
                            <option value="cacti">Cacti</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-6 text-start">
                        <label htmlFor="wateringFrequencyDays">Watering Frequency (Days)</label>
                    </div>
                    <div className="col-6">
                        <input
                            type="number"
                            className="form-control"
                            id="wateringFrequencyDays"
                            name="wateringFrequencyDays"
                            value={formData.wateringFrequencyDays}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-6 text-start">
                        <label htmlFor="lastWateredDate">Last Watered Date</label>
                    </div>
                    <div className="col-6">
                        <input
                            type="date"
                            className="form-control"
                            id="lastWateredDate"
                            name="lastWateredDate"
                            value={formData.lastWateredDate} // Format the date for input display
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-6 text-start">
                        <label htmlFor="location">Location</label>

                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row p-3">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add Plant</button>

                    </div>

                </div>

            </div>
        </form>
    );
};

export default AddPlantForm;
