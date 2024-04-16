// auth.js

export const isLoggedIn = () => {
  // Check if user session or token exists in local storage
  return localStorage.getItem("currentUser") !== null;
};

// export const login = async (email, password) => {
//   const res = await newRequest.post("/users/login", { email, password });
//   localStorage.setItem("currentUser", JSON.stringify(res.data));
// };

// export const signup = async (name, email, password) => {
//   // Perform signup API call here and store user data in local storage
//   const res = await newRequest.post("/users/signup", { name, email, password });
//   localStorage.setItem("currentUser", JSON.stringify(res.data));
// };