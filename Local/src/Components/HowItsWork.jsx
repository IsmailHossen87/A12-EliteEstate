import React from 'react';
import ReusableTitle from './ReusableTitle';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { BsHouseDoor } from "react-icons/bs";
import { IoMdDocument } from 'react-icons/io';
import { GiHouseKeys } from "react-icons/gi";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

const HowItsWork = () => {
    return (
        <div className="py-5 px-6 sm:px-10 lg:px-20">
            <ReusableTitle title="How it works?" subtitle="Find a perfect home" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Card 1 */}
                <Slide direction="left">
                    <div className="flex flex-col items-center text-center bg-white p-6 shadow rounded-lg">
                        <div className="mb-4 text-indigo-600 text-4xl">
                            <MdOutlineRealEstateAgent />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Find real estate</h3>
                        <p className="text-gray-600 text-sm">
                            Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco quod suavitate vix.
                        </p>
                    </div>
                </Slide>

                {/* Card 2 */}
                <Zoom>
                <div className="flex flex-col items-center text-center bg-white p-6 shadow rounded-lg">
                        <div className="mb-4 text-indigo-600 text-4xl">
                            <BsHouseDoor />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Meet realtor</h3>
                        <p className="text-gray-600 text-sm">
                            Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco quod suavitate vix.
                        </p>
                    </div>
                </Zoom>

                {/* Card 3 */}
               <Zoom>
               <div className="flex flex-col items-center text-center bg-white p-6 shadow rounded-lg">
                        <div className="mb-4 text-indigo-600 text-4xl">
                            <IoMdDocument />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Documents</h3>
                        <p className="text-gray-600 text-sm">
                            Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco quod suavitate vix.
                        </p>
                    </div>
               </Zoom>

                {/* Card 4 */}
                <Slide direction="right">
                    <div className="flex flex-col items-center text-center bg-white p-6 shadow rounded-lg">
                        <div className="mb-4 text-indigo-600 text-4xl">
                            <GiHouseKeys />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Take the keys</h3>
                        <p className="text-gray-600 text-sm">
                            Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco quod suavitate vix.
                        </p>
                    </div>
                </Slide>
            </div>
        </div>
    );
};

export default HowItsWork;
