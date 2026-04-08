import axios from "axios";

export const getDistance = (from, to) =>
  axios.post("/api/distance", { from, to });

export const getAddress = (lat, lng) =>
  axios.post("/api/geocode", { lat, lng });

export const createPayment = (amount, order_id) =>
  axios.post("/api/payment", { 
    amount,
    order_id, 
  });