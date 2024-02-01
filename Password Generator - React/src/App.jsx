import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters, passwordGenerator]);

  return (
    <div className="bg-zinc-300 w-full h-screen flex justify-center items-center flex-col">
      <div
        className="w-78 shadow-lg px-4 py-3 rounded-md"
        style={{ backgroundColor: "rgb(59 59 113)" }}
      >
        <div className="">
          <h2 className="text-white text-xl text-center bg-slate-800 rounded-md p-1">
            Password Generator
          </h2>
        </div>
        <div className="text-slate-200 my-2">
          <label htmlFor="password">Password</label>
          <input
            className="outline-none bg-slate-800 text-white w-full px-2 py-2 rounded-md my-1"
            type="text"
            readOnly
            ref={passwordRef}
            value={password}
            placeholder="Password"
          />
        </div>
        <div className="text-slate-200">
          <label htmlFor="length">Length :- {length}</label>
          <div className="bg-slate-800 rounded-md px-2 py-4 my-2">
            <input
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 flex"
              type="range"
              min={8}
              max={25}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-slate-200 my-2">
          <label htmlFor="settings">Settings</label>
          <div className="flex justify-center">
            <div className="bg-slate-800 flex items-center rounded-md px-2 py-2 my-2 mr-4">
              <input
                className="mr-3 w-4 h-4 cursor-pointer"
                type="checkbox"
                defaultChecked={setNumbers}
                onChange={() => {
                  setNumbers((prev) => !prev);
                }}
              />
              <label htmlFor="">Numbers</label>
            </div>
            <div className="bg-slate-800 flex items-center rounded-md px-2 py-2 my-2">
              <input
                className="mr-3 w-4 h-4 cursor-pointer"
                type="checkbox"
                defaultChecked={setCharacters}
                onChange={() => {
                  setCharacters((prev) => !prev);
                }}
              />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
        <div className="my-2">
          <button
            onClick={passwordGenerator}
            className="text-white w-full p-2 rounded-md text-lg bg-indigo-500 hover:bg-indigo-600"
          >
            Generate Password
          </button>
        </div>
        <div>
          <button
            onClick={copyPassword}
            className="text-white w-full p-2 rounded-md text-lg bg-indigo-500 hover:bg-indigo-600"
          >
            Copy Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
