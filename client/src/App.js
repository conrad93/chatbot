import './App.css';
import { useState, useEffect } from "react";
import getResponse from './api/getResponse';

function App() {
  const [inputVal, setInputVal] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [data]);

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

  function scrollToBottom(){
    document.getElementById("main").scrollTo(
      0,
      document.getElementById("main").scrollHeight
    );
  }

  function onPress(e){
    if(e.keyCode === 13){
      onSubmit();
    }
  }

  return (
    <div id='main' className="h-screen bg-gray-700 py-4 overflow-auto px-8 py-2">
      {data.map((el,idx) => {
        if(el.type === 'user'){
          return(
            <div key={idx} className="flex justify-end items-center">
              <div className="max-w-xl">
                <small className="text-gray-600">{el.type}</small>
                <div className="bg-gray-600 rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 mb-2">
                  <p className="text-base font-medium text-white">
                    {el.message}
                  </p>
                </div>
              </div>
            </div>
          )
        } else {
          return(
            <div key={idx} className="flex justify-start items-center">
              <div className="max-w-xl">
                <small className="text-gray-600">{el.type}</small>
                <div className="bg-gray-600 rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 mb-2">
                  <p className="text-base font-medium text-white">
                    {el.message}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      })}
      <div id="spacer" className="h-16"></div>
      <div className="fixed bottom-0 left-0 z-50 w-full py-2 px-8">
        <div className="relative shadow">
          <input onKeyDown={onPress} type="text" placeholder='Text here...' onChange={(e) => {setInputVal(e.target.value)}} value={inputVal} className="block w-full p-4 pl-10 text-sm text-white focus:outline-none rounded-lg bg-gray-600"/>
          { isLoading ? 
          <span className="text-white absolute right-2.5 bottom-2.5 font-medium text-sm px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 animate-pulse">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </span> : 
          <button onClick={onSubmit} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-gray-700 focus:outline-none hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button> }
        </div>
      </div>
    </div>
  );
}

export default App;