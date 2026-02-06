## Functionality Present
1. **Dark Mode Toggle**: Users can switch between light and dark modes.
2. **Schedule Management**:
    - **Add/Update Schedules**: Users can add new schedules or update existing ones.
    - **View Schedules**: All schedules are listed, and users can see details including names and dates.
    - **Delete Schedules**: Users can remove schedules they no longer need.
3. **Availability Management**:
    - **Set Availability**: Users can define their available times slots by day and time.
    - **Submit Availability**: Availability times can be submitted to the database.
    - **View Availability**: Users can view the available slots of all individuals.
    - **Delete Time Slots**: Users can remove specific time slots before submission.
4. **Overlapping Time Slot Detection**: The website detects and displays overlapping time slots between different users, which helps in managing schedule conflicts.

## Functionality Missing
- **User Authentication**: Currently, there is no user authentication system(user page) (https://github.com/comp227/final-liangyu-final/issues/1)
- **Styling & UI improvement** (https://github.com/comp227/final-liangyu-final/issues/2)

## Technologies/Libraries Used
- **React**
- **Axios**
- **Express**
- **Mongoose**
- **MongoDB**
- **Render**
- **Node.js**
- **CSS**

## How to download run the project
Directly open the project through Render link: https://final-liangyu.onrender.com/

Follow these steps to get the project up and running on your local machine:

## 1. Clone the Repository
Start by cloning the repository to your local machine. Open a terminal and run the following command:

```
git clone https://github.com/kokonut390/fullstack_taskmaster.git
```
```
cd final-liangyu-final
```
## 2. Install Dependencies
- **Backend**:
```
cd backend
```
```
npm i
```
- **Frontend**:
```
cd frontend
```
```
npm i
```
## 3. Set Environment Variables
- Create a `.env` file in the root of your backend directory.
- Example .env content:
```
DATABASE_URL=mongodb+srv://yourmongodbconnectionstring
```
- Adjust the url code in `index.js` in backend after you created `.env`.

## 4. Start the Server
- **Backend**:
```
npm start
```

- **Frontend**
```
npm run dev
```
- This will start the frontend development server and should automatically open a browser window to http://localhost:5173/ 
- The backend server will start on http://localhost:3001.
