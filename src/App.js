import './App.css';
import {ChatComponent} from "./Chat";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {SpeechRecognition} from "./SpeechRecognition";
import {ReadFromUrl} from "./ReadFromUrl";
import {ReadFromProvidedMaterial} from "./ReadFromProvidedMaterial";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav style={{
                    background: "#181818",
                    color: "white",
                    padding: "20px",
                    display: "flex",
                    gap: "20px",
                }}>
                    <NavLink to={"/"}>Common</NavLink>
                    <NavLink to={"/speech"}>Speech</NavLink>
                    <NavLink to={"/from-url"}>Read From Url</NavLink>
                    <NavLink to={"/provided-materials"}>Read From Provided Materials</NavLink>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <div className="App-header">
                            <ChatComponent/>
                        </div>}/>
                    <Route path="/speech" element={
                        <div className="App-header">
                            <SpeechRecognition/>
                        </div>}/>
                    <Route path="/from-url" element={
                        <div className="App-header">
                            <ReadFromUrl/>
                        </div>}/>
                    <Route path="/provided-materials"
                           element={
                               <header className="App-header">
                                   <ReadFromProvidedMaterial/>
                               </header>
                           }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
