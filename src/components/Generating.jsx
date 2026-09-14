import { loading } from "../assets";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-[#1c1a22]/85 border border-[#2a2530] rounded-[1.7rem] ${
        className || ""
      } text-base text-white`}
    >
      <img className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      AI is optimizing your workflow
    </div>
  );
};

export default Generating;