import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const ayah = Math.floor(Math.random() * 6236) + 1;

  const apiOne = `https://api.alquran.cloud/v1/ayah/${ayah}/editions/quran-uthmani,en.asad`;
  const apiTwo = `http://api.alquran.cloud/v1/ayah/${ayah}/ar.alafasy`;

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

  useEffect(() => {
    getData();
  }, []);

  console.log(data.data1);

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
      className="rounded-[0.5rem] w-[30rem] md:w-[40rem]  xl:w-full xl:h-full bg-gray-200 divide-slate-400/25 max-w-3xl max-h-3xl divide-y divide-solid flex flex-col justify-center items-center text-center p-10"
    >
      <p id="arab" className="antialiased arabic text-[2rem]">
        {/* <span className="text-[3rem] text-amber-200">۞</span> */}{" "}
        {ayahArabic}{" "}
        {/* <span className="text-[3rem] text-amber-200">۞</span> */}
      </p>
      <p className="text-[1rem] first-letter:uppercase text-gray-500">
        {ayahEnglish} <br />{" "}
        <span className="text-[0.8rem]">
          {ayahName} - {ayahNumber}
        </span>
      </p>
      <button className="GreenButton mt-5" onClick={getData}>
        Generate
      </button>
      <audio controls id="sf2" src={ayahAudio} type="audio/mp3"></audio>
    </div>
  );
}

export default App;
