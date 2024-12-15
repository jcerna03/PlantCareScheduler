import React from 'react';
import { waterPlant } from '../services/plantService';

const PlantCard = ({ plant, onPlantUpdated }) => {
    // Calculate the next watering date and status
    const nextWateringDate = new Date(
        new Date(plant.lastWateredDate).getTime() +
        plant.wateringFrequencyDays * 24 * 60 * 60 * 1000
    );
    const daysUntilNextWater = Math.ceil(
        (nextWateringDate - new Date()) / (1000 * 60 * 60 * 24)
    );
    const status =
        daysUntilNextWater <= 0
            ? 'Overdue'
            : daysUntilNextWater <= 3
                ? 'Due Soon'
                : 'OK';

    // Badge color based on status
    const statusBadgeClass =
        status === 'Overdue'
            ? 'badge bg-danger'
            : status === 'Due Soon'
                ? 'badge bg-warning text-dark'
                : 'badge bg-success';

    const handleWaterNow = async () => {
        try {
            await waterPlant(plant.id);
            alert(`${plant.name} has been watered successfully!`);
            onPlantUpdated(); // Notify parent to refresh the data
        } catch (error) {
            console.error('Error watering plant:', error);
            alert('Failed to update the plant. Please try again.');
        }
    };
    return (
        <div className=" col-12 col-sm-6 col-lg-4 p-3">
            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <h5 className="card-title text-primary">{plant.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{plant.type}</h6>
                    <p className="card-text text-start">
                        <strong>Location:</strong> {plant.location} <br />
                        <strong>Watering Frequency:</strong> Every {plant.wateringFrequencyDays} days <br />
                        <strong>Last Watered:</strong> {new Date(plant.lastWateredDate).toLocaleDateString()} <br />
                        <strong>Next Watering:</strong> {nextWateringDate.toLocaleDateString()}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className={statusBadgeClass}>{status}</span>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={handleWaterNow}
                        >
                            Water Now
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlantCard;
