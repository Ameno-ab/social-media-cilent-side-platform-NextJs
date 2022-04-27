import { SyncOutlined } from "@ant-design/icons";
const ForgotPasswordForm = ({
  handleSubmit,
  
  
  email,
  setEmail,
  newpassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
 

 
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
      />
    </div>
    <div className="form-group p-2">
      <small>
        <label className="text-muted">new Password</label>
      </small>
      <input
        value={newpassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Enter new Password"
      />
    </div>
  
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
   
    <div className="form-group p-2">
      <button
        disabled={!email || !newpassword ||!secret || loading}
        className="btn btn-primary col-12"
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "submit"}
      </button>
    </div>
  </form>
);

export default ForgotPasswordForm;
