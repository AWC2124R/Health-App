import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../../assets/styles/profilepage_style.css'

export default function Profile({pageUsername}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/getprofile', { username: pageUsername });

        delete response.data._id;
        delete response.data.__v;
        response.data.height += "cm";
        response.data.weight += "kg";

        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="json-list-container">
      {data ? (
        <ul>
          {Object.entries(data).map(([key, value], index) => (
            <li key={index}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {JSON.stringify(value).replace(/"/g, '').charAt(0).toUpperCase() + JSON.stringify(value).replace(/"/g, '').slice(1)}
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
}