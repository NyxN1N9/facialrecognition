import "tachyons";

// destructure
const Signin = () => {
  return (
    <div>
      <p className="f3 center dib white">{"Sign In"}</p>
      <div className="form center pa4 br3 shadow-6">
        <input className="Email f4 pa2 w-70" type="text">
          Email:
        </input>
        <input className="Password f4 pa2 w-70" type="text">
          Password:
        </input>
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
          SignIn
        </button>
      </div>
    </div>
  );
};

export default Signin;
