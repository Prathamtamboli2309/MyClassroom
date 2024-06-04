# 🏫 Classroom

## Description

Classroom is a modern web application designed to facilitate online education by allowing educators to create and manage courses, assignments, and share classroom materials, subject materials, and old question papers with students. The application features a user-friendly UI, enabling educators and students to interact seamlessly. Built with the MERN stack (MongoDB, Express.js, React, and Node.js), Classroom offers robust performance and scalability for educational management. The project uses RESTful API endpoints to handle communication between the frontend and backend.

## Features

- 📚 **Course Management**: Educators can create, update, and delete courses.
- 📝 **Assignment Management**: Assign and manage student assignments effortlessly.
- 🔒 **User Authentication**: Secure user registration and login functionality.
- 📱 **Responsive Design**: Accessible on both desktop and mobile devices.
- 🔍 **Search Functionality**: Easily search and filter courses and assignments.
- 📂 **Share Materials**: Faculty can share classroom materials, subject materials, and old question papers.
- 🌟 **Beautiful UI**: Clean and modern interface for an optimal user experience.
- 📷 **Image Storage**: Store course images and user avatars using Cloudinary.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **UI Framework**: Tailwind CSS (or any other UI framework used)
- **Image Storage**: Cloudinary
- **API**: RESTful API

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- 🟢 Node.js
- 🍃 MongoDB
- 📦 npm (Node Package Manager) or yarn

### Instructions

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Prathamtamboli2309/MyClassroom.git
    cd classroom
    ```

2. **Install backend dependencies:**

    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

5. **Run the application:**

    Open two terminal windows or tabs:

    - In the first terminal, start the backend server:

      ```sh
      cd backend
      npm start dev
      ```

    - In the second terminal, start the frontend development server:

      ```sh
      cd frontend
      npm start dev
      ```

    The application should now be running, with the backend server on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Usage

1. **🔐 Register/Login**: Create an account or log in with existing credentials.
2. **📚 Browse Courses**: View course listings on the homepage or search for specific courses.
3. **➕ Add a Course**: Use the "Add Course" form to create a new course.
4. **📝 Manage Assignments**: Create and manage assignments within each course.
5. **📂 Share Materials**: Faculty can upload and share classroom materials, subject materials, and old question papers with students.
6. **✏️ Edit/Delete Course**: If you are the course creator, you can edit or delete your courses.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.


## Acknowledgments

- 🙏 Thanks to the developers of the MERN stack components.
- 🙏 Special thanks to Cloudinary for providing image storage solutions.
- 🙏 Additional thanks to any third-party libraries and resources used in this project.
