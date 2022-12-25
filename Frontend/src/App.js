import { useEffect, useState } from "react";
import React from "react";
// these are the components 
import Navbar from "./components/Navbar";
import Links from "./components/Links";
import Nolink from "./components/NoLink";
import NewLink from "./components/NewLink";
import Loading from "./components/Loading";
import { Tailwind } from "./components/TailwindClases";
import Ping from "./components/Ping";
import Alert from "./components/Alert";

// Start of the application 

function App() {
  const log = console.log
  const [search, setSearch] = useState("");
  const [link, setLinks] = useState([]);
  const [shownew, setShownew] = useState(false);
  const [ping, setPing] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [num_link, setNum_links] = useState();
  const [loaded, setloaded] = useState(0);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const titel = link.length == 0 ?   'Some links to share 🥺 ?  ':'What are you looking for ?  '
  // Fetching the stored links on page Load 

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setisloading(true);
        const response = await fetch("api/links");
        const json = await response.json();
        if (response.ok) {
          setLinks(json);
          setisloading(false);
        }  
      } catch (error) {
        setAlert((prevstate) => {
          return {
            type: "error",
            message: "Server error , server might be down !",
          };
        });
        setisloading(false);
      }
     
    };

// Getting info about the number of stored links
    const fetchState = async () => {

      setisloading(true);
      const response = await fetch("api/state");
      const text = await response.text();
      if (response.ok) {
        setNum_links(text);
        setisloading(false);
      
      } else {
        
        setisloading(false);
      }
    };
    fetchLinks();
    fetchState();
  }, []);
// Fetching non stored links aka ahmia links
  async function handleSubmit(e) {
   
    setisloading(true);
    try {
      e.preventDefault();
      setSearch(e.target.value);
      const response = await fetch("/api/search?link=" + search);
      const json = await response.json();
      
      
      if (response.ok) {
        // jsonz = JSON.parse(json)
        setloaded(link.length)
        setLinks(json);
        setisloading(false);
        log(link.length)
       
      } 
    } catch (error) {
      setisloading(false);

    }
  
     

     
  }
// this is for shownig or not the NewLink form 
  const ToggleNewlink = () => {
    setShownew((prevVal) => !prevVal);
  };
  // this is for shownig or not the ping form to check if a selected link is alive or not
  const Toggleping = () => {
    setPing((prevVal) => !prevVal);
  };

  function alertAutoClose(){

  }
  

  return (
    <div className="App">

      <Navbar triger={ToggleNewlink} num_links={num_link} loaded={loaded} />

      {shownew ? <NewLink triger={ToggleNewlink} /> : ""}
     { alert.type == "error" ? (
        <Alert message={alert.message} alerttype={alert.type} />
      ):''}
      <div>
        <h1 className="text-6xl font-bold mt-10 mb-10 sm:text-6xl sm:font-bold titel">
          {titel}
        
        </h1>
      
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }} //
            value={search}
          ></input>

          <button className={Tailwind.buttons.primary}>Search</button>
        
        </form>

        <div className="Links-container">
          
          {isloading ? <Loading /> : ""}
          {link.length>0 ? (
           
            link.map((lnk) => (
              
              <Links
                key={lnk._id}
                titel={lnk.titel}
                link={lnk.link}
                description={lnk.description}
                status={lnk.status}
                lastCheckd={lnk.lastCheckd}
                triger={Toggleping}
              />
            ))
          
          ) : link.length == 0 ?(
          <Nolink />
          ):'e'}
           
            {ping ? <Ping triger={Toggleping}/>:""} 
        </div>
      </div>
    </div>
  );
}

export default App;
