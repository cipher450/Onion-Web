import { Tailwind } from "./TailwindClases";
export default function Navbar(props) {
  return (
    <header className="navbar">
      <div className="navbar--container">
        <label htmlFor="navbar-h1">
          <img
            src="https://i0.wp.com/www.techforpc.com/wp-content/uploads/2015/11/orbot-proxy-with-tor-for-pc-or-mac-windows-7810-free-download.png?fit=512%2C512&ssl=1"
            id="navbar-icon"
            alt="Tor Logo"
          ></img>
        </label>
        <h1
          id="navbar-h1"
          className="text-4xl font-bold sm:text-4xl sm:font-bold sm:ml-5 mt-5"
        >
          Onion Web
        </h1>
        <span>1.0</span>
      </div>
      <div className="line-v"></div>

      <div className=""></div>
      <div className="navbar--states">
        <span className={Tailwind.lables.label}>
          Stored Links : {props.num_links}
        </span>
        <span className={Tailwind.lables.label}>Alive : {props.num_links}</span>
        <span className={Tailwind.lables.label}>Loaded : {props.loaded}</span>
      </div>

      <div>
        <h3 className="navbar--item" onClick={props.triger}>
          {" "}
          Add Link
        </h3>
      </div>
    </header>
  );
}
