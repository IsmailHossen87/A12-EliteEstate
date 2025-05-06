import React, { useState } from "react";
import AgentsAll from "../Hooks/Agents/AgentsAll";
import PropertyCard from "./PropertyCard";
import ReusableTitle from "./ReusableTitle";

const AllProperties = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [agentAll] = AgentsAll(search);

  const verifiedProperties = agentAll.filter(
    (verify) => verify.verification === "Verified"
  );
  console.log("sort",sort)
  return (
    <div className="">
      <ReusableTitle
        title="All Properties at a Glance"
        subtitle="Discover a wide range of homes, offices, and more"
      />
      {/* Search Start */}
      <div className="md:w-3/5 mx-auto my-4 md:flex space-y-2  md:space-y-0 justify-between">
        <div className="md:w-[600px] mx-4">
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
        <div
          onClick={() => setSort(!sort)}
          className="flex items-center justify-center"
        >
          <button className="flex w-full mx-4 items-center justify-center bg-gray-700 p-3 rounded-lg border border-blue-500 text-white transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
            {sort ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto gap-4 p-2">
        {verifiedProperties?.map((data) => (
          <PropertyCard property={data}></PropertyCard>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
