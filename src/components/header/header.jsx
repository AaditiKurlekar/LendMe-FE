import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import { urlRoutes } from "../../constants";
import { getFullName } from "../../utils/string-utils";
import { removeItemsOnLogout } from "../../utils/local-storage-utils";

const Header = memo(() => {
  const navigate = useNavigate();
  const handleNavigationOnclick = useCallback(
    (url) => {
      navigate(url, { replace: true });
    },
    [navigate]
  );

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userObj = localStorage.getItem("user");
    if (token && userObj) {
      setIsUserLoggedIn(true);
      setUser(JSON.parse(userObj));
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const navigateToElement = (id) => {
    let elmntToView = document.getElementById(id);

    if (elmntToView) {
      elmntToView.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    removeItemsOnLogout();
    handleNavigationOnclick(urlRoutes.loginPage);
  };

  if (isUserLoggedIn) {
    return (
      <>
        <div className="header13">
          <div className="headerleft9">
            <div className="categories9" style={{fontSize: '1.1rem'}}>
              <div
                className="item58"
                onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
              >
                <div className="home11">
                  <img
                    className="iconoutlinehome9"
                    alt=""
                    src="/iconoutlinehome.svg"
                  />
                </div>
              </div>
              <div
                className={'item60 '.concat(window.location.href.indexOf('loan-request') > 1 ? 'active-link' : '')}
                onClick={() =>
                  handleNavigationOnclick(urlRoutes.loanRequestForm)
                }
              >
                Request a Loan
              </div>
              <div
                className={'item61 '.concat(window.location.href.indexOf('loans-list') > 1 ? 'active-link' : '')}
                onClick={() =>
                  handleNavigationOnclick(urlRoutes.loggedInLandingLoansList)
                }
              >
                Loans List
              </div>
              <div
                className={'item62 '.concat(window.location.href.indexOf('portfolio') > 1 ? 'active-link' : '')}
                onClick={() => handleNavigationOnclick(urlRoutes.portfolioPage)}
              >
                Portfolio
              </div>
              <div
                className={'item62 '.concat(window.location.href.indexOf('profile') > 1 ? 'active-link' : '')}
                onClick={() => handleNavigationOnclick(urlRoutes.profilePage)}
              >
                Profile
              </div>
            </div>
            <div
              className="logo20"
              onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
            >
              <b className="investment9">LendMe</b>
            </div>
            <img
              className="vector-icon9"
              onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
        <div className="profileandlogout6">
          <div className="content-wrapper4">
            <div className="content38">
              <div className="jenny-wilson6">
                {getFullName(user.firstName || "", user.lastName || "")}
              </div>
              <div className="jenwilsonexamplecom6">{user.email}</div>
            </div>
          </div>
          <div className="log-out6" onClick={handleLogout}>
            <img className="left-icon5" alt="" src="/left-icon.svg" />
            <div className="layout6">
              <div className="label30">Log out</div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="header8">
        <div className="headerleft6">
          <div className="categories6">
            <div className="item40">
              <div
                className="home7"
                onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
              >
                <img
                  className="iconoutlinehome6"
                  alt=""
                  src="/iconoutlinehome5.svg"
                />
              </div>
            </div>
            <div
              className="item41"
              onClick={() => navigateToElement("introduction")}
            >
              Introduction
            </div>
            <div
              className="item42"
              onClick={() => navigateToElement("features")}
            >
              Features
            </div>
            <div
              className="item41"
              onClick={() => navigateToElement("why-choose-us")}
            >
              Why choose us
            </div>
            <div className="item42" onClick={() => navigateToElement("about")}>
              About us
            </div>
            <div
              className="item42"
              onClick={() => navigateToElement("contact-us")}
            >
              Contact us
            </div>
          </div>
          <div
            className="logo13"
            onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
          >
            <b>LendMe</b>
          </div>
          <img
            className="vector-icon6"
            alt=""
            src="/black-and-white-collection-15.svg"
            onClick={() => handleNavigationOnclick(urlRoutes.landingPage)}
          />
        </div>
        <div className="buttons3">
          <div
            className="lightbutton5"
            onClick={() => handleNavigationOnclick(urlRoutes.loginPage)}
          >
            <div className="log-in2">Log In</div>
          </div>
          <div
            className="lightbutton6"
            onClick={() => handleNavigationOnclick(urlRoutes.signupPage)}
          >
            <div className="log-in2">Sign Up</div>
          </div>
        </div>
      </div>
    );
  }
});

export default Header;
