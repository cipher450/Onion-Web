import { useState } from "react";
import { Tailwind } from "./TailwindClases";
import Loading from "./Loading";
export default function Ping(props) {
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const icon = status ? "cloud" : "cloud_off";

  return (
    <div className="Ping pb-10 pt-5">
      <label className={Tailwind.lables}>Link : </label>
      <input className={Tailwind.inputs.inputText} placeholder="">
       { props.link}
      </input>
      <div className={Tailwind.layouts.centerdItems + " p-4"}>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <i className="material-icons mid-icon">{icon}</i>{" "}
            <h5>This website is {status ? "online" : "offline"}</h5>
          </div>
        )}
      </div>
    </div>
  );
}
