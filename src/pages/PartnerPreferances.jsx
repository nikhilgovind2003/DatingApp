import React, { useState } from "react";
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, ChakraProvider } from "@chakra-ui/react";
import PageTitle from "../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import Autocomplete from "react-google-autocomplete"; // Import the Autocomplete component
import axios from "axios";

function PartnerPreferances() {
  const [gender, setGender] = useState("Both");
  const [educationLevel, setEducationLevel] = useState("High School");
  const [lifestyleChoices, setLifestyleChoice] = useState("");
  const [religion, setReligion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [height, setHeight] = useState([100, 220]);
  const [weightRange, setWeightRange] = useState([40, 150]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [selectedLocation, setSelectedLocation] = useState("");

  console.log("selectedLocation" + selectedLocation);

  // Handle the place selection from Autocomplete
  const handlePlaceSelected = (place) => {
    setSelectedLocation(place.formatted_address); // Set the selected place address
    console.log("Selected Place:", place); // Log the entire place object for reference
  };

  const body = { gender, occupation, educationLevel, ageRange, height, weightRange, lifestyleChoices, religion, selectedLocation };
  const userinfo = JSON.parse(sessionStorage.getItem('userInfo')); // Parse the string into an object
  const userId = userinfo._id; // Access the _id property
  console.log(userId);

  const storePreference = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/users/preferences/${userId}`, body);
      console.log(response);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="bg-deep-plum pt-2 h-screen overflow-scroll">
      <PageTitle icon={Search} pageTitle={"Privacy & Settings  "} />
      <div className="bg-white rounded-t-3xl px-8 h-screen py-6 overflow-y-auto">
        <div className="text-2xl mb-2 font-semibold">Partner Preference</div>

        <div>
         
          <h1>Age Range: {ageRange[0]} - {ageRange[1]}</h1>
        </div>
        <ChakraProvider>
          <RangeSlider
            value={ageRange}
            onChange={(val) => setAgeRange(val)}
            width="100%"
            aria-label={["Min Age", "Max Age"]}
            min={18}
            max={35}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </ChakraProvider>

        <h1>Gender</h1>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-2 mb-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            <option  value="Both">select</option> 
          <option  value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <div>
          <h1>Locations</h1>
        </div>
        <div className="mt-2 mb-4">
          <Autocomplete
            apiKey="AIzaSyDKAcz-mKypU_dwlJfuGd_WJ6urLA66NIU" // Replace with your new API key
            onPlaceSelected={handlePlaceSelected}
            placeholder="Start typing your place"
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: "us" },
            }}
            style={{
              width: "100%",
              height: "40px",
              padding: "0 12px",
              borderRadius: "3px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <h1>Interests & Hobbies</h1>
        </div>
        <button className="bg-gray-500 hover:bg-blue-700 text-white px-4 rounded mx-2">
          Yoga
        </button>
        <button className="bg-gray-500 hover:bg-blue-700 text-white px-4 rounded mx-4">
          Jazz
        </button>
        <button className="bg-gray-500 hover:bg-blue-700 text-white px-4 rounded mx-2">
          Reading
        </button>

        <h1>Education Level</h1>
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          className="mt-2 mb-6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option  value="High School">High School</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        <div>
        <h1>height Range: {height[0]} - {height[1]}</h1>
        </div>
        <ChakraProvider>
          <RangeSlider
            value={height}
            onChange={(val) => setHeight(val)} // Update height range on slider change
            width="100%"
            aria-label={["Min Height", "Max Height"]}
            min={100}
            max={220}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </ChakraProvider>

        <div>
          <h1>Weight-{weightRange}</h1>
          <h1>kg40-150</h1>
        </div>
        <ChakraProvider>
          <RangeSlider
            value={weightRange}
            onChange={(val) => setWeightRange(val)} // Update weight range on slider change
            width="100%"
            aria-label={["Min Weight", "Max Weight"]}
            min={40}
            max={150}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </ChakraProvider>

        <h1>Lifestyle Choices</h1>
        <select
          value={lifestyleChoices}
          onChange={(e) => setLifestyleChoice(e.target.value)}
          className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option selected disabled value="">Select (default)</option>
          <option value="Social activities">Social activities</option>
          <option value="Arts and culture">Arts and culture</option>
          <option value="Indoor activities">Indoor activities</option>
        </select>

        <h1>Religion</h1>
        <select
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option selected disabled value="">Select (default)</option>
          <option value="Christian">Christian</option>
          <option value="Muslim">Muslim</option>
          <option value="Hindu">Hindu</option>
          <option value="Jain">Jain</option>
          <option value="Sikh">Sikh</option>
          <option value="Other">Other</option>
        </select>

        <h1>Occupation</h1>
        <select
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option selected  value=" ">Select (default)</option>
          <option value="Student">Student</option>
          <option value="Business">Business</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Construction">Construction</option>
          <option value="Retail">Retail</option>
          <option value="Other">Other</option>
        </select>

        <div className="mt-4">
          <button
            onClick={storePreference} // Trigger the function when clicked
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartnerPreferances;
