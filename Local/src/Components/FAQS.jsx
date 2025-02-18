import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const faqsData = [
  { question: "How do I list my property?", answer: "To list your property, sign up, navigate to 'Add Property', and fill in the details." },
  { question: "What fees are involved?", answer: "Listing is free, but we charge a commission on successful sales or rentals." },
  { question: "How do I contact an agent?", answer: "You can contact agents via their profiles or the contact form on property listings." },
];

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat py-4 md:py-8 lg:py-10"
      style={{ backgroundImage: "url('https://i.ibb.co/pRPy3JJ/premium-photo-1689609949921-6b2529511e38.jpg')" }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 "></div>

      {/* FAQ Content */}
      <div className="relative w-4/5 mx-auto my-10 p-6 text-white rounded-lg shadow-lg">
        <div className="md:flex items-center md:space-x-8">
          {/* Left Section */}
          <div className="md:w-1/3">
            <h4 className="text-xl md:text-3xl font-bold text-blue-400">Your Guide to Real Estate</h4>
            <p className="mt-2">Find answers to common questions about buying, selling, and renting properties.</p>
          </div>

          {/* Right Section */}
          <div className="md:w-2/3 space-y-4">
            {faqsData.map((faq, index) => (
              <div key={index} className="border border-blue-500 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-800 rounded-lg focus:outline-none transition duration-300 hover:bg-gray-700"
                >
                  <span className="text-lg">{faq.question}</span>
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === index && (
                  <div className="p-4 text-gray-300 bg-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;
