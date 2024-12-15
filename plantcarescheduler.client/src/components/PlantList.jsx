import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, onPlantUpdated }) => {
    return (
        <div className="row">
            {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} onPlantUpdated={onPlantUpdated} />
            ))}
        </div>
    );
};

export default PlantList;