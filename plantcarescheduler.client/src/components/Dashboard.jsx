import React, { useEffect, useState } from 'react';
import { getPlants, getPlantsDue } from '../services/plantService';
import PlantList from './PlantList';
import AddPlantForm from './AddPlantForm';

const Dashboard = () => {
    const [plants, setPlants] = useState([]);
    const [duePlants, setDuePlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredPlants, setFilteredPlants] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Fetch all plants and due plants
    const fetchPlants = async () => {
        setLoading(true);
        try {
            const plantsResponse = await getPlants();
            const duePlantsResponse = await getPlantsDue();
            setPlants(plantsResponse.data);
            setFilteredPlants(plantsResponse.data); // Initialize filtered plants
            setDuePlants(duePlantsResponse.data);
        } catch (error) {
            console.error('Error fetching plants:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleRefreshPlants = () => {
        fetchPlants(); // Fetch the latest plant data from the API
    };
    // Initial fetch on component mount
    useEffect(() => {
        fetchPlants();
    }, []);

    // Filter plants when filterType or filterStatus changes
    useEffect(() => {
        const filterPlants = () => {
            let filtered = plants;
            // Filter by type
            if (filterType) {
                filtered = filtered.filter((plant) => plant.type === filterType);
            }
            // Filter by status
            if (filterStatus) {
                filtered = filtered.filter((plant) => {
                    const daysSinceLastWatered = (new Date() - new Date(plant.lastWateredDate)) / (1000 * 60 * 60 * 24);

                    if (filterStatus === 'Overdue') {
                        return daysSinceLastWatered >= plant.wateringFrequencyDays;
                    }
                    if (filterStatus === 'Due Soon') {
                        return (
                            daysSinceLastWatered >= plant.wateringFrequencyDays - 3 &&
                            daysSinceLastWatered < plant.wateringFrequencyDays
                        );
                    }
                    if (filterStatus === 'OK') {
                        return daysSinceLastWatered < plant.wateringFrequencyDays - 3;
                    }

                    return true;
                });
            }
            setFilteredPlants(filtered);
        };
        filterPlants();
    }, [filterType, filterStatus, plants]);

    return (
        <div className="container" style={{ minWidth: '1140px'}}>
            <h1>🌱 Plant Care Dashboard</h1>
            <p>Keep track of your plants and ensure they're happy and healthy!</p>
            {/* Section for adding new plants */}
            <div className="row">
                <div className="col-11">
                    <h2>All Plants</h2>
                </div>
                <div className="col-1">
                    <div className="text-end">
                        <button className="btn btn-primary rounded-circle"
                            onClick={toggleModal}
                            aria-label="Add New Plant">
                            +
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <div className="d-flex mb-4 gap-3">
                    <select
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="succulent">Succulent</option>
                        <option value="tropical">Tropical</option>
                        <option value="herb">Herb</option>
                        <option value="cacti">Cacti</option>
                    </select>
                    <select
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Due Soon">Due Soon</option>
                        <option value="OK">OK</option>
                    </select>
                </div>
                {loading ? (
                    <p>Loading plants...</p>
                ) : plants.length > 0 ? (
                        <PlantList plants={filteredPlants} onPlantUpdated={handleRefreshPlants} />
                ) : (
                    <p>No plants found. Start by adding a plant!</p>
                )}
            </div>
            {/* Section for due plants */}
            <div className="row">
                <h2>Plants Needing Watering</h2>
                {loading ? (
                    <p>Loading plants...</p>
                ) : duePlants.length > 0 ? (
                    <PlantList plants={duePlants} />
                ) : (
                    <p>🎉 No plants need watering at the moment!</p>
                )}
            </div>
            {/* Modal for Adding Plant */}
            {isModalOpen && (
                <div
                    className="modal show fade"
                    style={{
                        display: 'block',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black translucent backdrop
                    }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Plant</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={toggleModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AddPlantForm onClose={toggleModal} onPlantAdded={fetchPlants} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
