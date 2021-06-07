import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';
import '../utils/utils';
import { COLUMNS } from './columns';
import DisplayTable from './Table';

function DisplayLogApiResult() {
      const columns = React.useMemo(() => COLUMNS, []);

  const [logData, setlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const flattenObject = (obj) => {
    const flattened = {}
   
    Object.keys(obj).forEach((key) => {
     if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
     } else {
      flattened[key] = obj[key]
     }
    })
   
    return flattened
   }



  const getlogData = async() => {
    try {
      const data = await axios.get (
        "http://localhost:3000/api/logs"
      )
      console.log(data.data.map(x => {
        return flattenObject(x);
      }));
     setlogData(data.data.map(x => {
      return flattenObject(x);
    }));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getlogData();
    }, []);
  
    return (
      <div className="DisplayLogApiResult">
            <DisplayTable columns={columns} data={logData} />
      </div>
    );
}

export default DisplayLogApiResult;
