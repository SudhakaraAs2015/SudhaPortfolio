import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import Loader from "./components/Loader";
import axiosInstance from "./axiosInstance"; 
import { useDispatch, useSelector } from "react-redux";
import {
  HideLoading,
  ReloadData,
  SetportfolioData,
  ShowLoading,
} from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  // Function to fetch portfolio data from the backend using the Axios instance
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.get("/get-portfolio-data"); 
      console.log("API Response:", response.data); 
      dispatch(SetportfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Error fetching portfolio data:", error); 
    }
  };

  useEffect(() => {
    if (reloadData) {
      console.log("Fetching new data due to reloadData change...");
      getPortfolioData();
    }
  }, [reloadData]);

  // Fetch portfolio data when app first loads or when `portfolioData` is null
  useEffect(() => {
    if (!portfolioData) {
      console.log("Portfolio data not found, fetching...");
      getPortfolioData();
    }
  }, [portfolioData]);

  // Log current Redux state
  console.log("Current portfolio data:", portfolioData);

  return (
    <>
      <BrowserRouter>
        {loading ? <Loader /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
