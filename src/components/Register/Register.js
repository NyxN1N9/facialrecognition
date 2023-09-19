import "tachyons";

// destructure
const Register = () => {
  return (
    <div>
      <p className="f3 center dib white">{"Registration Form"}</p>
      <div className="form center pa4 br3 shadow-6">
        <input className="FirstName f4 pa2 w-70" type="text">
          First Name:
        </input>
        <input className="LastName f4 pa2 w-70" type="text">
          Last Name:
        </input>
        <input className="Email f4 pa2 w-70" type="text">
          Email:
        </input>
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
