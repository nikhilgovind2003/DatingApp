import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../redux/features/auth/authSlice";
import axios from "axios";
import { API_URL } from "@/apiConfig";

const GlobalLocationHandler = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.userAuth?.isAuthenticated,
  );
  const locationFetched = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || locationFetched.current) return;

    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            console.log(
              `Got location — accuracy: ±${Math.round(position.coords.accuracy)}m`,
            );

            // 1. Dispatch coordinates to Redux
            dispatch(
              setCurrentLocation({
                location: "Fetching...",
                coords: { latitude, longitude },
              }),
            );

            try {
              // 2. Reverse geocode to get city name
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              );
              const data = await response.json();

              if (data && data.address) {
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.address.state ||
                  "Current Location";

                // 3. Update Redux with readable location
                dispatch(
                  setCurrentLocation({
                    location: city,
                    coords: { latitude, longitude },
                  }),
                );

                // 4. Optionally sync with backend (similar to HomePage logic)
                await axios.post(
                  `${API_URL}/users/getlocation`,
                  { latitude, longitude },
                  { withCredentials: true },
                );

                locationFetched.current = true;
              }
            } catch (error) {
              console.error(
                "Error in reverse geocoding or syncing location:",
                error,
              );
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          {
            enableHighAccuracy: true, // use GPS instead of IP
            timeout: 15000, // wait up to 15s for GPS lock
            maximumAge: 0, // never use cached position
          },
        );
      }
    };

    getLocation();
  }, [isAuthenticated, dispatch]);

  return null; // This component doesn't render anything
};

export default GlobalLocationHandler;
