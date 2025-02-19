import { FaBuilding, FaHome, FaHandsHelping } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";

const About = () => {
  return (
    <div className="bg-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <Slide direction="down">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            <span className="text-blue-500">About </span>
            <span className="text-gray-300">Us</span>
          </h2>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Slide direction="left">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
              <FaBuilding className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-300">
                We aim to revolutionize the real estate industry with innovative
                solutions and excellent customer service.
              </p>
            </div>
          </Slide>

          <Slide direction="up">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
              <FaHome className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">
                What We Do
              </h3>
              <p className="text-gray-300">
                We help clients buy, sell, and rent properties while ensuring
                transparency, efficiency, and satisfaction.
              </p>
            </div>
          </Slide>

          <Slide direction="right">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
              <FaHandsHelping className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">
                Our Commitment
              </h3>
              <p className="text-gray-300">
                We are committed to providing top-notch real estate services,
                ensuring our clients find their dream properties.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default About;
