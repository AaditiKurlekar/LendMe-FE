import Header from "../../components/header/header";
import "./landing.scss";
const LandingPage = () => {
  return (
    <div className="landingpage">
      <Header />
      <div className="fast-accurate-reliable-parent">
        <b className="fast-accurate-reliable" data-testid="heading">
          P2P. Transparent. Reliable
        </b>
        <div className="the-most-powerful">
        The LendMe application offers registered users a choice of peer-to-peer (P2P) loans, depending on their financial situation. This includes options for users who want to invest in a loan. Users can browse through a range of loan requests, filter by interest rates, and choose the one that best suits their needs. Additionally, LendMe provides a money transfer service, allowing users to receive funds electronically through their application wallet.
        </div>
      </div>
      <div id="features" className="card-parent" data-testid="cards">
        <div className="card1">
          <div className="icon4">
            <img
              className="merchant-account-icon"
              alt=""
              src="/merchant-account@2x.png"
            />
          </div>
          <div className="content19">
            <div className="fax">Accounts</div>
            <b className="title12">Monitor data</b>
          </div>
          <div className="text28">
            where an individual has invested in loans or borrowed money from
            lenders. It involves monitoring the status of these loans to track
            details
          </div>
        </div>
        <div className="card1">
          <div className="icon4">
            <img
              className="merchant-account-icon"
              alt=""
              src="/security-shield-green@2x.png"
            />
          </div>
          <div className="header9">
            <div className="content19">
              <div className="fax">Secure</div>
              <b className="title12">Your Data is in Good Hands</b>
            </div>
          </div>
          <div className="paragraph1">
            <div className="text29">
              Encrypting data is an important security measure to protect
              sensitive information, By encrypting your data.
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="icon4">
            <img
              className="merchant-account-icon"
              alt=""
              src="/combo-chart@2x.png"
            />
          </div>
          <div className="header9">
            <div className="content19">
              <div className="fax">Analytics</div>
              <b className="title12">Aggrement generation</b>
            </div>
          </div>
          <div className="paragraph1">
            <div className="text29">
              This application generated pdf of aggrement between borrower and
              lender for trust worthy operations
            </div>
          </div>
        </div>
      </div>
      <div className="footer" data-testid="footer">
        <div className="newsletter">
          <div className="menu">
            <div className="newsletter1">Newsletter</div>
            <div className="be-the-first">
              Be the first one to know about investments and raising loan
              requests
            </div>
          </div>
          <div className="colornewsletter">
            <img className="coloricon" alt="" src="/coloricon.svg" />
            <div className="enter-your-email">Enter your email</div>
            <div className="right">
              <div className="colorbutton">
                <div className="register-login">Submit</div>
              </div>
            </div>
          </div>
        </div>
        <div id="introduction" className="left1">
          <div className="introduction1">
            <b className="fax">LendMe</b>
            <div className="we-ara-a-container">
              <span>{`LendMe application offers registered users a choice of loans, depending on their financial situation also for those users who wants to invest into a loan. Users can browse through a range of loan requests, filter by interest rates and choose the one that suits their needs best. LendMe also offers a money transfer service so that users can get money sent to them electronically through their application wallet.`}</span>
            </div>
          </div>
          <div id="contact-us" className="contact1">
            <div className="lightfax">
              <img className="icons30" alt="" src="/icons15.svg" />
              <div className="text31">
                <div className="fax">Contact</div>
                <div className="div83">1234567890</div>
              </div>
            </div>
            <div className="lightfax">
              <img className="icons30" alt="" src="/icons16.svg" />
              <div className="text31">
                <div className="fax">Mail</div>
                <div className="div83">lendme.p2p@gmail.com</div>
              </div>
            </div>
            <div className="lightfax">
              <img className="icons30" alt="" src="/icons17.svg" />
              <div className="text31">
                <div className="fax">Address</div>
                <div className="campfire-ave-meriden1">
                  White field, Bangalore
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menus">
          <div className="menu1">
            <b id="about">About</b>
            <div className="items">
              <div className="about">About us</div>
              <div className="about">Blog</div>
              <div className="about">Careers</div>
              <div className="about">Jobs</div>
            </div>
          </div>
          <div className="menu1">
            <b className="about">Support</b>
            <div className="items">
              <div className="about">Contact us</div>
              <div className="about">Online Chat</div>
              <div className="about">Whatsapp</div>
              <div className="about">Email</div>
            </div>
          </div>
          <div className="menu1">
            <b className="about">FAQ</b>
            <div className="items">
              <div className="about">Account</div>
              <div className="about">Agreement</div>
              <div className="about">Portfolio</div>
              <div className="about">Payments</div>
            </div>
          </div>
        </div>
        <div className="bottombar">
          <div className="items6">
            <div className="enter-your-email">About us</div>
            <div className="enter-your-email">Contact</div>
            <div className="enter-your-email">Privacy policy</div>
            <div className="enter-your-email">Sitemap</div>
            <div className="enter-your-email">Terms of Use</div>
          </div>
          <div className="all-rights-reserved">
            © 2023, All Rights Reserved
          </div>
        </div>
      </div>
      <div id="why-choose-us" className="chart-parent">
        <div className="chart">
          <div className="heading">
            <b className="fax">Store Metrics</b>
            <div className="your-current-sales">
              Your current sales summary and activity.
            </div>
          </div>
          <div className="divider11" />
          <div className="settings-kabob">
            <div className="settings-kabob-child" />
            <div className="settings-kabob-child" />
            <div className="settings-kabob-child" />
          </div>
          <div className="container11">
            <div className="stats">
              <div className="stat">
                <div className="line-parent">
                  <div className="frame-child" />
                  <div className="overall-return-parent">
                    <div className="enter-your-email">Overall return</div>
                    <b className="b">62%</b>
                  </div>
                </div>
                <div className="badge">
                  <img className="badge-child" alt="" src="/polygon-1.svg" />
                  <div className="log-in2">10.78%</div>
                </div>
              </div>
              <div className="stat">
                <div className="line-parent">
                  <div className="frame-child" />
                  <div className="overall-return-parent">
                    <div className="enter-your-email">Credit</div>
                    <b className="b">12%</b>
                  </div>
                </div>
                <div className="badge1">
                  <img className="badge-child" alt="" src="/polygon-1.svg" />
                  <div className="log-in2">1.08%</div>
                </div>
              </div>
              <div className="stat">
                <div className="line-parent">
                  <div className="frame-child" />
                  <div className="overall-return-parent">
                    <div className="enter-your-email">Cash</div>
                    <b className="b">30%</b>
                  </div>
                </div>
                <div className="badge1">
                  <img className="badge-child" alt="" src="/polygon-1.svg" />
                  <div className="log-in2">5.90%</div>
                </div>
              </div>
            </div>
            <div className="tools">
              <div className="search-bar22">
                <img className="coloricon" alt="" src="/icons18.svg" />
                <div className="advanced-analytics">Search</div>
              </div>
              <div className="buttons4">
                <div className="month">
                  <div className="register-login">Monthly</div>
                  <img className="icon7" alt="" src="/icon2.svg" />
                </div>
                <div className="month">
                  <img className="icons34" alt="" src="/icons19.svg" />
                  <div className="register-login">Filter</div>
                </div>
              </div>
            </div>
          </div>
          <div className="graph">
            <div className="data">
              <img className="lines-icon" alt="" src="/lines.svg" />
              <div className="y-axis">
                <div className="enter-your-email">$25,000</div>
                <div className="enter-your-email">$20,000</div>
                <div className="div90">$15,000</div>
                <div className="enter-your-email">$10,000</div>
                <div className="enter-your-email">$5,000</div>
                <div className="enter-your-email">$0</div>
              </div>
              <div className="graph1">
                <div className="column6">
                  <div className="data1">
                    <div className="credit1" />
                    <div className="credit2" />
                    <div className="credit3" />
                  </div>
                  <div className="enter-your-email">Jan</div>
                </div>
                <div className="column6">
                  <div className="data2">
                    <div className="credit1" />
                    <div className="credit6" />
                    <div className="credit7" />
                  </div>
                  <div className="enter-your-email">Feb</div>
                </div>
                <div className="column6">
                  <div className="data3">
                    <div className="credit1" />
                    <div className="credit10" />
                    <div className="credit11" />
                  </div>
                  <div className="enter-your-email">Mar</div>
                </div>
                <div className="column6">
                  <div className="data4">
                    <div className="credit1" />
                    <div className="credit14" />
                    <div className="credit15" />
                  </div>
                  <div className="enter-your-email">Apr</div>
                </div>
                <div className="column6">
                  <div className="data5">
                    <div className="credit1" />
                    <div className="credit18" />
                    <div className="credit19" />
                  </div>
                  <div className="enter-your-email">May</div>
                </div>
                <div className="column6">
                  <div className="data6">
                    <div className="credit1" />
                    <div className="credit18" />
                    <div className="credit23" />
                  </div>
                  <div className="enter-your-email">Jun</div>
                </div>
                <div className="column6">
                  <div className="data7">
                    <div className="credit1" />
                    <div className="credit26" />
                    <div className="credit27" />
                  </div>
                  <div className="enter-your-email">Jul</div>
                </div>
                <div className="column6">
                  <div className="data8">
                    <div className="credit1" />
                    <div className="credit30" />
                    <div className="credit31" />
                  </div>
                  <div className="enter-your-email">Aug</div>
                </div>
                <div className="column6">
                  <div className="data9">
                    <div className="credit1" />
                    <div className="credit34" />
                    <div className="credit35" />
                  </div>
                  <div className="enter-your-email">Sep</div>
                </div>
                <div className="column6">
                  <div className="data10">
                    <div className="credit1" />
                    <div className="credit38" />
                    <div className="credit15" />
                  </div>
                  <div className="enter-your-email">Oct</div>
                </div>
                <div className="column6">
                  <div className="data4">
                    <div className="credit1" />
                    <div className="credit42" />
                    <div className="credit15" />
                  </div>
                  <div className="enter-your-email">Nov</div>
                </div>
                <div className="column6">
                  <div className="data12">
                    <div className="credit1" />
                    <div className="credit46" />
                    <div className="credit47" />
                  </div>
                  <div className="enter-your-email">Dec</div>
                </div>
              </div>
            </div>
            <div className="key">
              <div className="ellipse-parent">
                <div className="ellipse-div" />
                <div className="enter-your-email">Credit</div>
              </div>
              <div className="ellipse-parent">
                <div className="frame-child1" />
                <div className="enter-your-email">Cash</div>
              </div>
              <div className="ellipse-parent">
                <div className="frame-child2" />
                <div className="enter-your-email">Crypto</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lorem-ipsum-dolor">
          Where an individual has invested in loans or borrowed money from
          lenders. It involves monitoring the status of these loans to track
          details
        </div>
        <div className="buttons5">
          <div className="label27">Learn More</div>
        </div>
        <div className="track-real-time">
          Track real time data with advanced analytics
        </div>
        <div className="feature">
          <div className="icons-wrapper">
            <img className="coloricon" alt="" src="/icons20.svg" />
          </div>
          <div className="advanced-analytics">Advanced Analytics</div>
        </div>
        <div className="feature1">
          <div className="icons-wrapper">
            <img className="coloricon" alt="" src="/icons20.svg" />
          </div>
          <div className="advanced-analytics">Upfront agreement</div>
        </div>
        <div className="feature2">
          <div className="icons-wrapper">
            <img className="coloricon" alt="" src="/icons20.svg" />
          </div>
          <div className="advanced-analytics">Wallet transfer</div>
        </div>
        <div className="line-div" />
        <b className="why-choose-us">WHY CHOOSE US</b>
      </div>
    </div>
  );
};

export default LandingPage;
