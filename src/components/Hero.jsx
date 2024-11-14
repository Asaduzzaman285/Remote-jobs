import React,{useState} from 'react'


const Hero = (props) => {
  
var janina = true;
  const [title, setTitle] = useState(props.title); //1st
  const [subtitle, setSubtitle] = useState(props.subtitle);
  const [bgColor, setBgcolor] = useState('bg-indigo-700');
  const [toggle,setToggle]=useState(false);
const handleClick = () => {
  
 
  if(!toggle){ 
    setTitle("Hi !");
    setSubtitle("Happy to get updated !");
    setBgcolor('bg-red-700');
    setToggle(true);  
  }
  else { 
    setTitle(props.title);
    setSubtitle(props.subtitle);
    setBgcolor('bg-indigo-700');
    setToggle(false);
  }
};
  return (
    <div>
       <section className={`${bgColor} py-20 mb-4`}>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
           {title}
          </h1>
          <p className="my-4 text-xl text-white">
            {subtitle}
          </p>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
    Click me
  </button>

        </div>
      </div>
    </section>
    </div>
  )
}

export default Hero
