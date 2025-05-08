import { Slide } from "react-awesome-reveal";
import {FaEnvelope,FaFacebook,FaInstagram, FaLinkedin,FaMapMarkerAlt,FaPhoneAlt,FaTwitter,FaWhatsapp,
} from "react-icons/fa";
import "../Components/button.css"
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
  .sendForm('service_aaux1xa', 'template_gbkorju', form.current, 'xtvNQW9zdnjhVL7f0')
  .then(
    (result) => {
      console.log('SUCCESS!', result.status, result.text);
      Swal.fire({
        title: "Email sent successfully!",
        icon: "success",
        draggable: true,
      });
      form.current.reset();
    },
    (error) => {
      console.error('FAILED...', error.text);
      Swal.fire({
        title: "Email failed to send.",
        text: error.text,
        icon: "error",
      });
    }
  );

  };
  return (
    <div className="bg-gray-900  py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <Slide direction="down">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            <span className="text-blue-500">Contact </span>
            <span className="text-gray-300">Me</span>
          </h2>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Slide direction="left">
            <div className="bg-gray-800  p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 mb-6">
                Get in Touch
              </h3>
              <form ref={form} onSubmit={sendEmail}>
                {/* Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="user_name"
                    id="name"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring focus:ring-blue-800"
                    placeholder="Your Name"
                    required
                  />
                </div>
                {/* Email */}
                <div className="mb-4">  
                  <input
                    type="email"
                    id="email"
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring focus:ring-blue-800"
                    placeholder="Your Email"
                    name="user_email"
                    required
                  />
                </div>
                {/* Message */}
                <div className="mb-6">
                  <textarea
                    id="message"
                    rows="1"
                    name="message"
                   className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring focus:ring-blue-800"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="proCardButton w-full border-none font-bold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </Slide>

          {/* Contact Info */}
          <Slide direction="right">
            <div className="bg-gray-800 p-8 rounded-lg md:h-[390px] shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 text-xl mr-3" />
                  <p className="text-gray-300">Sylhet, Bangladesh</p>
                </div>
                {/* Email */}
                <div className="flex items-center">
                  <FaEnvelope className="text-blue-500 text-xl mr-3" />
                  <p className="text-gray-300">ismailhosen8757@gmail.com</p>
                </div>
                {/* Phone */}
                <div className="flex items-center">
                  <FaPhoneAlt className="text-blue-500 text-xl mr-3" />
                  <p className="text-gray-300">+8801995998757</p>
                </div>
                {/* Phone */}
                <div className="flex items-center">
                  <FaWhatsapp className="text-blue-500 text-2xl mr-3" />
                  <p className="text-gray-300">+8801754433707</p>
                </div>
              </div>

              {/* Social Media Links */}
              <h3 className="text-2xl font-semibold text-blue-500 mt-8  mb-6">
                Social Media
              </h3>
              <div className="flex space-x-4 justify-center">
                {/* Facebook */}
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-500 text-2xl"
                >
                  <FaFacebook />
                </a>
                {/* Twitter */}
                <a
                  href="https://twitter.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-500 text-2xl"
                >
                  <FaTwitter />
                </a>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801995998757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-500 text-2xl"
                >
                  <FaWhatsapp />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-500 text-2xl"
                >
                  <FaInstagram />
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-500 text-2xl"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Contact;
