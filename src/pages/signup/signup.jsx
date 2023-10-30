import "./signup.scss";
import { useCallback, useState } from "react";
import ButtonComponent from "../../components/material-ui-components/button/button-component";
import Header from "../../components/header/header";
import { CircularProgress, FormControl, TextField } from "@mui/material";
import isEmail from "validator/lib/isEmail";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { urlRoutes } from "../../constants";
import { create } from "../../utils/axios-utils";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    pan: "",
    aadhar: "",
    password: "",
  };
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [formData, setFormData] = useState(initialValues);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);

  const onClickLoginHere = useCallback(() => {
    navigate(urlRoutes.loginPage);
  }, [navigate]);

  const handleSubmitSignUp = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);

    const resp = await create("auth/register", formData);
    if (resp.status === "SUCCESS") {
      localStorage.setItem("accessToken", resp.data.token);
      localStorage.setItem("user", JSON.stringify(resp.data.user));
      navigate(urlRoutes.loggedInLandingLoansList);
    } else {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handlePasswordChange = (inputPassword) => {
    if (
      validator.isStrongPassword(inputPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setFormData({ ...formData, password: inputPassword });
    } else {
      setPasswordError(
        "Enter a password atleast 8 characters having atleast 1 number, symbol, uppercase alphabet and lowercase alphabet"
      );
    }
  };

  const handleConfirmedPasswordChange = (inputConfirmPassword) => {
    if (inputConfirmPassword !== formData.password) {
      setConfirmPasswordError("Passwords to not match");
    }
  };

  return (
    <div className="signuppage">
      <Header />
      <form
        className="sign-up3"
        onSubmit={(e) => handleSubmitSignUp(e)}
        data-testid="signup-title"
      >
        <div className="top7">
          <div className="title9">
            <div className="sign-up-parent">
              <div className="sign-up4">Sign Up</div>
              <div className="well-get-you">
                We’ll get you up and running so you can verify your personal
                information and customize your account.
              </div>
            </div>
          </div>
        </div>
        <div className="middle1">
          <div className="inputs3">
            <div className="name11">
              <FormControl className="firstname" data-testid="first-name">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="first-name"
                  id="first-name"
                  label="First Name"
                  placeholder="Enter first name"
                  size="medium"
                  margin="none"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl className="firstname">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="last-name"
                  id="last-name"
                  label="Last Name"
                  placeholder="Enter last name"
                  size="medium"
                  margin="none"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </FormControl>
            </div>
            <div className="name11">
              <FormControl className="firstname">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Enter email"
                  size="medium"
                  margin="none"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setValidEmail(true);
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  onBlur={(e) => {
                    const val = e.target.value;
                    if (isEmail(val)) {
                      setValidEmail(true);
                    } else {
                      setValidEmail(false);
                    }
                  }}
                />
              </FormControl>

              <FormControl className="firstname">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="number"
                  name="mobile"
                  id="mobile"
                  label="Mobile"
                  placeholder="Enter mobile number"
                  size="medium"
                  margin="none"
                  required
                  value={formData.mobile}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length > 10) {
                      return;
                    }
                    setFormData({ ...formData, mobile: val });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="sub-label invalid-email">
              {validEmail ? " " : "Incorrect Email"}
            </div>
            <div className="name11">
              <FormControl className="firstname">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="pan-no"
                  id="pan-no"
                  label="Pan No."
                  placeholder="Enter pan number"
                  size="medium"
                  margin="none"
                  required
                  value={formData.pan}
                  onChange={(e) =>
                    setFormData({ ...formData, pan: e.target.value })
                  }
                />
              </FormControl>
              <FormControl className="firstname">
                <TextField
                  className="firstname1"
                  color="primary"
                  variant="outlined"
                  type="number"
                  name="aadhar-no"
                  id="aadhar-no"
                  label="Aadhar No."
                  placeholder="Enter aadhar number"
                  size="medium"
                  margin="none"
                  required
                  value={formData.aadhar}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length > 12) {
                      return;
                    }
                    setFormData({ ...formData, aadhar: val });
                  }}
                />
              </FormControl>
            </div>
            <div className="password">
              <TextField
                className="firstname1"
                color="primary"
                variant="outlined"
                type="password"
                name="password"
                id="password"
                label="Create Password"
                placeholder="at least 8 characters"
                size="medium"
                margin="none"
                required
                value={formData.password}
                onBlur={(e) => handlePasswordChange(e.target.value)}
                onChange={(e) => {
                  setPasswordError("");
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              {passwordError ? (
                <div className="sub-label">{passwordError}</div>
              ) : (
                <></>
              )}
            </div>
            <div className="password">
              <TextField
                className="firstname1"
                color="primary"
                variant="outlined"
                type="password"
                name="confirm-pass"
                id="confirm-pass"
                label="Confirm Password"
                size="medium"
                margin="none"
                required
                value={confirmedPassword}
                onChange={(e) => {
                  setConfirmPasswordError("");
                  setConfirmedPassword(e.target.value);
                }}
                onBlur={(e) => handleConfirmedPasswordChange(e.target.value)}
                disabled={passwordError ? true : false}
              />
              {confirmPasswordError ? (
                <div className="sub-label">{confirmPasswordError}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="bottom3">
          <ButtonComponent
            className="cta14"
            buttonText={
              loading ? (
                <CircularProgress
                  style={{ color: "white", width: "28px", height: "28px" }}
                />
              ) : (
                "Sign up"
              )
            }
            type="submit"
          />

          <div className="login">
            <div className="already-have-an">Already have an account?</div>
            <div className="login-here" onClick={onClickLoginHere}>
              Login here
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
