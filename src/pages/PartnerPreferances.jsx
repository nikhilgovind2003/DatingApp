import { API_URL, SOCKET_URL } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, ChakraProvider } from "@chakra-ui/react";
import PageTitle from "../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from 'sonner';

import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce'; // Import debounce from lodash for debouncing saves

function PartnerPreferences() {
  const [gender, setGender] = useState('Male');
  const [educationLevel, setEducationLevel] = useState("High School");
  const [lifestyleChoices, setLifestyleChoice] = useState("");
  const [religion, setReligion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [height, setHeight] = useState([100, 220]);
  const [weightRange, setWeightRange] = useState([40, 150]);
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [locations, setLocations] = useState([]); 
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [prefData, setPrefData] = useState(null);
  const navigate = useNavigate(); 

  const userinfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const userId = userinfo._id;

  useEffect(() => {
    const getPreferenceData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/preferences/${userId}`);
        const data = response.data;
        setPrefData(data);
        setGender(data.gender || 'Male');
        setEducationLevel(data.educationLevel || 'High School');
        setLifestyleChoice(data.lifestyleChoices || '');
        setReligion(data.religion || '');
        setOccupation(data.occupation || '');
        setHeight(data.height || [100, 220]);
        setWeightRange(data.weightRange || [40, 150]);
        setAgeRange(data.ageRange || [18, 35]);
        setLocations(data.locations || []);
        setInterests(data.interests || []);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };
    getPreferenceData();
  }, [userId]);

  const handleInputChange = (event) => {
    setNewInterest(event.target.value);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() !== '' && interests.length < 3) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  const handleLocationChange = (event) => {
    setNewLocation(event.target.value);
  };

  const handleAddLocation = () => {
    if (newLocation.trim() !== '' && locations.length < 3) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  const body = { gender, occupation, educationLevel, ageRange, height, weightRange, lifestyleChoices, religion, locations, interests };

  // Debounced save function
  const debouncedSave = debounce(async () => {
    try {
      const response = await axios.post(`${API_URL}/users/preferences/${userId}`, body);
      console.log(response);
      
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(error.response?.data?.message || "Error occurred while saving!");
    }
  }, 1000); // 1-second debounce

  // Trigger save on every state change
  useEffect(() => {
    debouncedSave();
    // Cleanup the debounce on unmount
    return () => {
      debouncedSave.cancel();
    };
  }, [gender, occupation, educationLevel, ageRange, height, weightRange, lifestyleChoices, religion, locations, interests]);

  return (
    <div className="bg-deep-plum pt-2 h-screen overflow-scroll">
      <PageTitle icon={Search} pageTitle={"Privacy & Settings"} />
      <div className="bg-white rounded-t-3xl px-8 h-screen py-6 overflow-y-auto">
        
        <div className="text-2xl mb-2 font-semibold">Partner Preference</div>

        {/* Age Range */}
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
            max={40}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </ChakraProvider>

        {/* Gender */}
        <h1>Gender</h1>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-2 mb-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Location */}
        <div>
          <h1>Location</h1>
          <div className="flex items-center">
            <input
              type="text"
              value={newLocation}
              onChange={handleLocationChange}
              className="appearance-none block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              disabled={locations.length >= 3}
            />
            <button
              onClick={handleAddLocation}
              className={`ml-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 ${locations.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={locations.length >= 3}
            >
              +
            </button>
          </div>

          <ul className="mt-2 list-disc flex gap-2 p-2 text-white">
            {locations.map((location, index) => (
              <li className="border bg-gray-900 px-2" key={index}>
                {location}
                <button
                  onClick={() => handleRemoveLocation(index)}
                  className="ml-2 text-sm font-medium px-1 rounded-sm"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <h1 className="text-md">Interests & Hobbies</h1>
          <div className="flex items-center">
            <input
              type="text"
              value={newInterest}
              onChange={handleInputChange}
              className="appearance-none block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md"
              disabled={interests.length >= 3}
            />
            <button
              onClick={handleAddInterest}
              className={`ml-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 ${interests.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={interests.length >= 3}
            >
              +
            </button>
          </div>

          <ul className="mt-2 list-disc flex gap-2 p-2 text-white">
            {interests.map((interest, index) => (
              <li className="border bg-gray-900 px-2" key={index}>
                {interest}
                <button
                  onClick={() => handleRemoveInterest(index)}
                  className="ml-2 text-sm font-medium px-1 rounded-sm"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Education Level */}
        <h1>Education Level</h1>
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          className="mt-2 mb-6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <option value="High School">High School</option>
          <option value="Bachelor">Bachelor</option> 
          <option value="Masters">Masters</option> 
          </select>
              {/* Height Range */}
    <div>
      <h1>Height Range: {height[0]} - {height[1]}</h1>
    </div>
    <ChakraProvider>
      <RangeSlider
        value={height}
        onChange={(val) => setHeight(val)}
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

    {/* Weight Range */}
    <div>
      <h1>Weight Range: {weightRange[0]} - {weightRange[1]}</h1>
    </div>
    <ChakraProvider>
      <RangeSlider
        value={weightRange}
        onChange={(val) => setWeightRange(val)}
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

    {/* Lifestyle Choices */}
    <h1>Lifestyle Choices</h1>
    <select
      value={lifestyleChoices}
      onChange={(e) => setLifestyleChoice(e.target.value)}
      className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <option value="">Select (default)</option>
      <option value="Social activities">Social activities</option>
      <option value="Arts and culture">Arts and culture</option>
      <option value="Indoor activities">Indoor activities</option>
    </select>

    {/* Religion */}
    <h1>Religion</h1>
    <select
      value={religion}
      onChange={(e) => setReligion(e.target.value)}
      className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <option value="">Select (default)</option>
      <option value="Christian">Christian</option>
      <option value="Muslim">Muslim</option>
      <option value="Hindu">Hindu</option>
      <option value="Jain">Jain</option>
      <option value="Sikh">Sikh</option>
      <option value="Other">Other</option>
    </select>

    {/* Occupation */}
    <h1>Occupation</h1>
    <select
      value={occupation}
      onChange={(e) => setOccupation(e.target.value)}
      className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <option value="">Select (default)</option>
      <option value="Student">Student</option>
      <option value="Business">Business</option>
      <option value="Healthcare">Healthcare</option>
      <option value="Construction">Construction</option>
      <option value="Retail">Retail</option>
      <option value="Other">Other</option>
    </select>

    <div className="mt-4">
      <button
        onClick={() => navigate('/match')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Matches
      </button>
    </div>
  </div>
</div>
); }

export default PartnerPreferences;



