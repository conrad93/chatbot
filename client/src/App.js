import './App.css';
import { useState } from "react";
import getResponse from './api/getResponse';

function App() {
  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(){
    setIsLoading(true);
    setData(oldData => [...oldData,{type: "user", message: inputVal}]);
    let res = await getResponse({message: inputVal});
    if(res){
      setData(oldData => [...oldData,{type: "bot", message: res.response}]);
    }
    setIsLoading(false);
    setInputVal("");
  }

  return (
    <div className="h-screen bg-gray-700 py-4">
      {data.map(el => {
        if(el.type === 'user'){
          return(
            <div className="mb-6">
              <div className="flex px-8 py-2">
                <span className="mr-6 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white w-6 h-6">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p className="text-base font-medium text-white">
                  {el.message}
                </p>
              </div>
            </div>
          )
        } else {
          return(
            <div className="bg-gray-600 mb-6">
              <div className="flex px-8 py-2">
                <span className="mr-6 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white w-6 h-6">
                    <path fill-rule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
                <p className="text-base font-medium text-white">
                  {el.message}
                </p>
              </div>
            </div>
          )
        }
      })}
      <div className="fixed bottom-0 left-0 z-50 w-full py-2 px-8">
        <div className="relative shadow">
          <input type="text" onChange={(e) => {setInputVal(e.target.value)}} value={inputVal} className="block w-full p-4 pl-10 text-sm text-white focus:outline-none rounded-lg bg-gray-600"/>
          { isLoading ? 
          <span className="text-white absolute right-2.5 bottom-2.5 font-medium text-sm px-4 py-2">Loading...</span> : 
          <button onClick={onSubmit} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 focus:outline-none hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2">Submit</button> }
        </div>
      </div>

    </div>
  );
}

export default App;