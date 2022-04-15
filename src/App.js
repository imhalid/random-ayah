import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const ayah = Math.floor(Math.random() * 6236) + 1;

  const apiOne = `https://api.alquran.cloud/v1/ayah/${ayah}/editions/quran-uthmani,en.asad`;
  const apiTwo = `https://api.alquran.cloud/v1/ayah/${ayah}/ar.alafasy`;

  const [data, setData] = useState([]);

  const getData = async () => {
    const data = await axios.all([axios.get(apiOne), axios.get(apiTwo)]).then(
      axios.spread((data1, data2) => {
        return {
          data1,
          data2,
        };
      })
    );
    setData(data);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const ayahArabic = data.data1.data.data[0].text;
  const ayahEnglish = data.data1.data.data[1].text;
  const ayahName = data.data1.data.data[1].surah.englishName;
  const ayahNumber = data.data1.data.data[1].surah.numberOfAyahs;
  const ayahAudio = data.data2.data.data.audio;

  return (
    <div
      id="container"
      className="ml-1 mr-1 rounded-[0.5rem]  bg-gray-200 divide-slate-400/25 max-w-3xl max-h-3xl divide-y divide-solid flex flex-col justify-center items-center text-center p-10"
    >
      <p id="arab" className="antialiased arabic text-[2rem]">
        {ayahArabic}
      </p>
      <p className="text-[1rem] first-letter:uppercase text-gray-500">
        {ayahEnglish} <br />{" "}
        <span className="text-[0.8rem]">
          {ayahName} - {ayahNumber}
        </span>
      </p>
      <div>
        <button className="GreenButton m-2" onClick={getData}>
          Generate
        </button>
        <button className="YellowButton m-2" onClick={toggle}>
          AutoPlay / {isOpen ? "false" : "true"}
        </button>
      </div>
      <audio
        className="p-2"
        controls
        autoPlay={isOpen}
        id="sf2"
        src={ayahAudio}
        type="audio/mp3"
      ></audio>
    </div>
  );
}

export default App;

export function TablerPlayerPlay(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 4v16l13-8z"
      ></path>
    </svg>
  );
}

export function TablerPlayerStop(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <rect
        width="14"
        height="14"
        x="5"
        y="5"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        rx="2"
      ></rect>
    </svg>
  );
}
