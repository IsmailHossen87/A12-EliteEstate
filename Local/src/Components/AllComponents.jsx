import React, { useState } from 'react';
import AgentsAll from '../Hooks/Agents/AgentsAll';
import PropertyCard from './PropertyCard';
import ReusableTitle from './ReusableTitle';


const AllProperties = () => {
    const [search, setSearch] = useState("");
    const [agentAll]= AgentsAll(search)
    
    const verifiedProperties  = agentAll.filter((verify)=> verify.verification === 'Verified')

    return (
       <div className=''>
        <ReusableTitle title='All Properties at a Glance' subtitle='Discover a wide range of homes, offices, and more'/>
                {/* Search Start */}
                <div className="md:w-3/5 mx-auto my-4">
          <form>
            <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
              <input
                className="w-full py-2 px-4 bg-transparent text-white placeholder-gray-400 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search for location..."
                aria-label="Search for location"
              />
            </div>
          </form>
        </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
            {
                verifiedProperties?.map(data => <PropertyCard property={data}></PropertyCard>)
            }
        </div>
       </div>
    );
};

export default AllProperties;