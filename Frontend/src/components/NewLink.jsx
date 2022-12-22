import Alert from "./Alert";

import { Tailwind } from "./TailwindClases";
import React, { useEffect } from "react";
import { useState } from "react";

function NewLink(props) {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const [showalert,setShwoalert] = useState(false)
  const [titel, setTitel] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [status, setstatus] = useState("alive");
  const [cls,setcls]=useState("Cancel");

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
 
  function closeForm(e) {
    e.preventDefault();
    props.triger();
  }
  const validate = ()=>{
     
    if(isEmptyOrSpaces(titel)){
      setAlert((prevstate) => {
        return {
          type: "warning",
          message: "a titel is required to add a link",
        };
      });
    


      setShwoalert(true)


      return false
    }
    if(isEmptyOrSpaces(link)){
      setAlert((prevstate) => {
        return {
          type: "warning",
          message: "i don't think that i need to tell you this but ... the Link .. it missing ",
        };
      });
      return false
    }
    if(!link.endsWith('.onion')){
      setAlert((prevstate) => {
        return {
          type: "warning",
          message: "That is not an onion link ",
        };
      });
      return false
    }
    if(isEmptyOrSpaces(description)){
       setDescription('Description not provided')
      
    }
   return true
  }

  async function handleNewLink(e) {
    e.preventDefault();
    if (validate() == true){
      try {
        let lastChecked = "Never";
        const newLink = { titel, description, link,lastChecked, status };
        console.log(JSON.stringify(newLink));
        const response = await fetch("/api/new", {
          method: "POST",
          body: JSON.stringify(newLink),
          headers: {
            "Content-Type": "application/json",
          }
  
        });
        const json = await response.json();
      
        if (response.ok) {
          setAlert((prevstate) => {
            return {
              type: "success",
              message: "Your link has been sent , it will be added after review.",
            };
          });
          setShwoalert(true)
          setcls("Close")
        }
      } catch (error) {
        setAlert((prevstate) => {
          return {
            type: "error",
            message: error.message,
          };
        });
      }
    }



   
  }
 

  return (
    <div className="newlink">
      {showalert ? <Alert message={alert.message} alerttype={alert.type} />:"" }
     

      <form onSubmit={handleNewLink}>
        <label htmlFor="titel" className={Tailwind.lables.label}>
          Titel :
        </label>
        <input
          type="text"
          id="titel"
          className={Tailwind.inputs.inputText}
          onChange={(e) => {
            setTitel(e.target.value);
          }}
          value={titel}
        />

        <label htmlFor="lnk" className={Tailwind.lables.label}>
          Link :
        </label>
        <input
          type="text"
          id="lnk"
          class={Tailwind.inputs.inputText}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          value={link}
        />
        <label htmlFor="desc" className={Tailwind.lables.label}>
          Description :
        </label>

        <textarea
          id="desc"
          rows="10"
          className={Tailwind.inputs.inputText}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        ></textarea>
        <div className="newlink--btn">
          <button
            className={Tailwind.buttons.secondary + "hover:bg-green-600"}
            
          >
            Add Link
          </button>
          <button
            className={Tailwind.buttons.secondary + "hover:bg-red-600"}
            onClick={closeForm}
          >
            {cls}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewLink;
