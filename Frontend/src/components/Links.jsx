import { Tailwind } from "./TailwindClases";
export default function Links(props) {
  // What kind of data that we will be having here ?
  // 1-Link .onion *
  // 2-link status Active/offline *
  // 3-Copy link *
  // 4-Description of the site*
  // 5-tags
  //
  //
  return (
    <div className="LinkCard">
      <br />
      <span
        id="LinkCard-status"
        className={
          props.status
            ? Tailwind.buttons.primary
            : "bg-red-600 " + Tailwind.buttons.Nocolor
        }
        onClick={props.triger}
      >
        {props.status}
      </span>
      <span id="LinkCard-Copy" className={Tailwind.buttons.Nocolor}>
        Copy
      </span>
      <label className={Tailwind.lables.label}>
        Onion Titel :{" "}
        <span className='"block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300'>
          {props.titel}
        </span>
      </label>{" "}
      <br />
      <label className={Tailwind.lables.label}>Onion link :</label>
      <input value={props.link} className={Tailwind.inputs.inputText} />
      <br />
      <label className={Tailwind.lables.label}>Site descritpion :</label>
      <input value={props.description} className={Tailwind.inputs.inputText} />
      <label>Last Time checked : {props.lastCheckd}</label>
    </div>
  );
}
