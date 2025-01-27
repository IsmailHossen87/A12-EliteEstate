import React from 'react';
import AgentsAll from '../Hooks/Agents/AgentsAll';
import PropertyCard from './PropertyCard';
import ReusableTitle from './ReusableTitle';

const AdvertiseHome = () => {
    const [agentAll] = AgentsAll()
    const advertise = agentAll.filter(data => data.advertise === true).slice(0,4)
    return (
        <div>
            <ReusableTitle title='Featured Properties' subtitle='Explore our exclusive selection of verified listings'></ReusableTitle>
         <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-4 md:m-2">
            {
                advertise?.map(item => <PropertyCard key={item._id} property={item}></PropertyCard>)
            }
        </div>
        </div>
    );
};

export default AdvertiseHome;