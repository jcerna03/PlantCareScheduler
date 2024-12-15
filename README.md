## Setup Instructions (For Recruiters)

1. **Download the Project**: Clone or download the project repository from GitHub.
2. **Install Dependencies**:
   - Open the project in Visual Studio 2022.
   - Allow NuGet to restore all required packages.
3. **Run the Project**:
   - Set the solution to start both the backend (`PlantCareScheduler.Server`) and frontend (`PlantCareScheduler.Client`).
   - Press `F5` or click on the "Run" button in Visual Studio to launch the application.

---

## Brief Explanation of the Approach

The solution was developed using the following technologies and tools:
- **Visual Studio 2022**
- **.NET 8**
- **Entity Framework Core 9**
- **React.js (Frontend)**

### Project Structure
The solution comprises two projects:
- **`PlantCareScheduler.Server`**: The backend API developed in ASP.NET Core.
- **`PlantCareScheduler.Client`**: The frontend built using React.js.

### Backend Development

1. **Setting Up Dependencies**:
   - Installed the following NuGet packages via the Package Manager:
     - `Microsoft.EntityFrameworkCore`
     - `Microsoft.EntityFrameworkCore.SqlServer`
     - `Microsoft.EntityFrameworkCore.Tools`
     - `Microsoft.EntityFrameworkCore.Design`
     - `Microsoft.EntityFrameworkCore.InMemory` (for testing)

2. **Model Creation**:
   - Created a `Models` folder and added `Plant.cs` based on the requirements.

3. **Database Configuration**:
   - Implemented the `AppDbContext` class in the `Data` folder.
   - Added the SQL Server database connection string to the `appsettings.json` file.
   - Configured the data context in `Program.cs` for dependency injection.

4. **Database Migration**:
   - Ran the following commands to generate the initial migration and create the database:
     ```bash
     Add-Migration InitialCreate
     Update-Database
     ```

5. **Controller Implementation**:
   - Developed the `PlantsController.cs` in the `Controllers` folder.
   - Implemented the following RESTful endpoints:
     - `GET /api/plants`: List all plants.
     - `POST /api/plants`: Add a new plant.
     - `PUT /api/plants/:id/water`: Record plant watering.
     - `GET /api/plants/due`: Retrieve plants due for watering.

### Frontend Development

1. **Folder Structure**:
   - Organized the frontend components under the following structure:
     ```
     ClientApp/
     ├── src/
     ├── components/
     │   ├── Dashboard.js
     │   ├── AddPlantForm.js
     │   ├── PlantList.js
     │   └── PlantCard.js
     ├── services/
     │   └── plantService.js
     ```

2. **HTTP Client Integration**:
   - Installed Axios for API communication:
     ```bash
     npm install axios
     ```
   - Configured the `plantService.js` module for interaction with the backend endpoints.

### Testing

- **Unit Tests**:
   - Created a dedicated test project using **NUnit**.
   - Developed unit tests for the `PlantsController` to verify:
     - Retrieving plants (`GET /api/plants`)
     - Adding new plants (`POST /api/plants`)
     - Recording plant watering (`PUT /api/plants/:id/water`)
     - Retrieving plants due for watering (`GET /api/plants/due`).
- **In-Memory Database**:
   - Used Entity Framework Core's `InMemory` provider to isolate and test the backend logic.

---

### Summary

This project demonstrates a full-stack application built with modern tools and frameworks, following clean architecture principles. The backend exposes a REST API, and the frontend interacts seamlessly via Axios. 
Testing is robust with unit tests using NUnit and an in-memory database for backend validation. The solution adheres to maintainability and scalability best practices, making it ready for further enhancements or deployment.
