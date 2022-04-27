import { SyncOutlined } from "@ant-design/icons";
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdat,
}) => (
  <form onSubmit={handleSubmit}>
    {profileUpdat && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">User name</label>
        </small>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          placeholder="User Name"
        />
      </div>
    )}
    {profileUpdat && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">About</label>
        </small>
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Write about yourself.."
        />
      </div>
    )}
    {page !== "login" && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">your name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter Name"
        />
      </div>
    )}
    <div className="form-group p-2">
      <small>
        <label className="text-muted">email address</label>
      </small>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        placeholder="Email address"
        disabled={profileUpdat}
      />
    </div>
    <div className="form-group p-2">
      <small>
        <label className="text-muted">Password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Password"
      />
    </div>
    {page !== "login" && (
      <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Pick your question</label>
          </small>
          <select className="form-control">
            <option value="">What is your favourite color?</option>
            <option value="">What is your best friends name?</option>
            <option value="">What city you where born?</option>
          </select>
          <small className="form-text text-muted">
            you can use this reset your password if forgotten.
          </small>
        </div>
        <div className="form-group p-2">
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write your answer here"
          />
        </div>
      </>
    )}
    <div className="form-group p-2">
      <button
        disabled={
          profileUpdat ? loading :
          page === "login"
            ? !email || !password || loading
            : !name || !email || !secret || !password || loading
        }
        className="btn btn-primary col-12"
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
