import Form from "./components/Form";

function App() {
  return (
    <div className="bg-yellow-400 h-screen w-full relative overflow-hidden overflow-y-scroll ">
      <h1 className="font-bold text-4xl text-center pt-5">ID.Dev</h1>
      <Form />
      <footer className="bg-white w-[80%] h-10 bottom-0  rounded-t-lg right-[10%] hidden md:flex justify-evenly fixed mt-5">
        <h1 className="font-light items-start mt-2">The HIVE</h1>
        <ul className="flex justify-center items-center  gap-5 text-lg font-bold text-gray-600 cursor-pointer">
          <li className="px-5 py-1 rounded hover:bg-yellow-100">Eugene</li>
          <li className="px-5 py-1 rounded hover:bg-yellow-100">Courage</li>
          <li className="px-5 py-1 rounded hover:bg-yellow-100">Alex</li>
          <li className="px-5 py-1 rounded hover:bg-yellow-100 ">Salem</li>
          <li className="px-5 py-1 rounded hover:bg-yellow-100">Seth</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
