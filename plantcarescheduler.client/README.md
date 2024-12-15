Setup instructions

- download project
- install dependencies
- run the project from visual studio 2022

Brief explanation of approach

- To create this solution we are going to use the tools:
Visual Studio 2022
.NET 8
EF 9

We are going to start by creating the PlantCareScheduler solution with an ASP.NET Core with React.js template

This will create 2 projects plantcarescheduler.client (Frontend) and PlantCareScheduler.Server (Backend)

For the Backend we are going to open the NuGet package manager and we are going to install the dependencies:

- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.InMemory

Then Let's create the Models folder and create the Plant.cs class with the model given in the requirement.

Then we will create the Data folder and create the data context AppDbContext.cs

Then we will add the connection for the database in the appsettings.json file

Then we will make the respective configurations to add the data context to the application in the Program.cs class

Then we will run the following commands in the Package Manager console:
Add-Migration InitialCreate
Update-Database

This will create the database in your SQL Database Server.

Then we will create the PlantsController.cs controller in the Controllers folder with the endpoints options given in the requirement.

GET /api/plants - List all plants
POST /api/plants - Add a plant
PUT /api/plants/:id/water - Record watering
GET /api/plants/due - Get plants due for watering

For the Frontend we are going to install the following folder structure for the components:

ClientApp/
├── src/
├── components/
│ ├── Dashboard.js
│ ├── AddPlantForm.js
│ ├── PlantList.js
│ └── PlantCard.js
├── services/
│ └── plantService.js

Let's open a PowerShell console and install the package axios to be able to make requests to the endpoints already created from the client side.

npm install axios

For the tests we are going to create a unit test project using NUnit