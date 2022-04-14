import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const ayah = Math.floor(Math.random() * 6236) + 1;
  const url = `https://api.alquran.cloud/v1/ayah/${ayah}/editions/quran-uthmani,en.asad`;
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch {
      alert("Api Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const ayahArabic = data.data[0].text;
  const ayahEnglish = data.data[1].text;
  const ayahName = data.data[1].surah.englishName;
  const ayahNumber = data.data[1].surah.numberOfAyahs;
  const ayahPage = data.data[1].page;

  return (
    <div className="bg-gray-200 divide-slate-400/25 divide-y divide-solid flex flex-col h-screen justify-center items-center text-center p-10">
      <p className="arabic text-[200%]" onClick={getData}>
        {ayahArabic}
      </p>
      <p className="text-[150%] first-letter:uppercase text-gray-500">
        {ayahEnglish} <br />{" "}
        <span className="text-[70%]">
          {ayahName} - {ayahNumber}
        </span>
      </p>
      <button className="GreenButton mt-5" onClick={getData}>
        Generate
      </button>
    </div>
  );
}

export default App;
