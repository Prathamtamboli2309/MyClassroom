import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [classes, setClasses] = useState([]);
  const [likedClasses, setLikedClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/class/getallclass"
        );
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const fetchLikedClasses = async () => {
    if (user) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/like/getlikeclass/${user._id}`
        );
        setLikedClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching liked classes:", error);
      }
    }
  };

  useEffect(() => {
    fetchLikedClasses();
  }, [user]);

  const updateClassLikeStatus = (classId, isLiked) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls._id === classId ? { ...cls, isLiked: isLiked } : cls
      )
    );
  };

  const addLike = async (classId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/like/${classId}/like`,
        {
          userId: user._id,
        }
      );

      if (response.status === 200) {
        setLikedClasses((prevLikedClasses) => [
          ...prevLikedClasses,
          response.data.likedClass,
        ]);
        updateClassLikeStatus(classId, true);
      } else {
        console.error("Failed to add like");
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const removeLike = async (classId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/like/${classId}/unlike`,
        {
          userId: user._id,
        }
      );

      if (response.status === 200) {
        setLikedClasses((prevLikedClasses) =>
          prevLikedClasses.filter((id) => id !== response.data.likedClass._id)
        );
        updateClassLikeStatus(classId, false);
      } else {
        console.error("Failed to remove like");
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, classes, likedClasses, addLike, removeLike }}
    >
      {children}
    </AppContext.Provider>
  );
};
