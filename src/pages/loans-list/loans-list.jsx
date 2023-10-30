import { Radio, RadioGroup, CircularProgress } from "@mui/material";
import "./loans-list.scss";
import Header from "../../components/header/header";
import { useEffect, useRef, useState } from "react";
import { loanStatus, urlRoutes } from "../../constants";
import { numberWithCommaINR } from "../../utils/number-utils";
import { months2years } from "../../utils/date-utils";
import ButtonComponent from "../../components/material-ui-components/button/button-component";
import { read } from "../../utils/axios-utils";
import { getFullName } from "../../utils/string-utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoansList = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [interestQuery, setInterestQuery] = useState("");
  const [tenureQuery, setTenureQuery] = useState("");
  const [principalAmountQuery, setPrincipalAmountQuery] = useState("");

  const [principleAmountFilterData, setPrincipleAmountFilterData] = useState({
    zero: true,
    one: false,
    two: false,
    three: false,
  });

  const [interestRateFilterData, setInterestRateFilterData] = useState({
    zero: true,
    one: false,
    two: false,
    three: false,
  });

  const [tenureFilterData, setTenureFilterData] = useState({
    zero: true,
    one: false,
    two: false,
    three: false,
  });

  //interest
  const interestQueryObj = {
    zero: "",
    one: "interestLte=10",
    two: "interestGte=10&interestLte=15",
    three: "interestGte=15",
  };

  const getInterestQuery = () => {
    const key = Object.entries(interestRateFilterData).find((entry) => {
      return entry[1];
    });
    if (key) {
      return interestQueryObj[key[0]];
    }
  };

  useEffect(() => {
    if (Object.keys(interestRateFilterData).find((val) => val)) {
      const query = getInterestQuery();
      setInterestQuery(query);
    }
  }, [interestRateFilterData]);

  //tenure
  const tenureQueryObj = {
    zero: "",
    one: "tenureLte=12",
    two: "tenureGte=12&tenureLte=24",
    three: "tenureGte=24",
  };

  const getTenureQuery = () => {
    const key = Object.entries(tenureFilterData).find((entry) => {
      return entry[1];
    });
    if (key) {
      return tenureQueryObj[key[0]];
    }
  };

  useEffect(() => {
    if (Object.keys(tenureFilterData).find((val) => val)) {
      const query = getTenureQuery();
      setTenureQuery(query);
    }
  }, [tenureFilterData]);

  //principal amount
  const principalAmountQueryObj = {
    zero: "",
    one: "amountLte=100000",
    two: "amountGte=100000&amountLte=1000000",
    three: "amountGte=1000000",
  };

  const getPrincipalAmountQuery = () => {
    const key = Object.entries(principleAmountFilterData).find((entry) => {
      return entry[1];
    });
    if (key) {
      return principalAmountQueryObj[key[0]];
    }
  };

  useEffect(() => {
    if (Object.keys(principleAmountFilterData).find((val) => val)) {
      const query = getPrincipalAmountQuery();
      setPrincipalAmountQuery(query);
    }
  }, [principleAmountFilterData]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getLoans([interestQuery, tenureQuery, principalAmountQuery].join("&"));
  }, [interestQuery, tenureQuery, principalAmountQuery]);

  const [loading, setLoading] = useState(false);

  const getLoans = async (query = "") => {
    try {
      setLoading(true);
      const resp = await read(`loan?limit=100&offset=0&${query}`);
      if (resp.status === "SUCCESS") {
        const user = JSON.parse(localStorage.getItem("user"));
        const loanList = resp.data.loans.filter(
          (loan) =>
            loan.loanStatus === loanStatus.REQUESTED &&
            user.email !== loan.borrower?.email
        );
        setLoans(loanList);
      } else {
        toast.error("Something went wrong");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getLoans();
  }, []);

  const handleCheckLoanDetailsClick = (loanData) => {
    navigate(`${urlRoutes.loanDetailPage}/${loanData.id}`);
  };

  const getLoanListHTML = () => {
    if(loans.length < 1) {
            return <p style={{alignSelf:'center', margin: 'auto'}}>No Loans found...</p>;
    }

    return loans.map((loan) => (
      <div className="checkout3">
        <div className="user1">
          <div className="space">
            <div className="container1">
              <div className="content10">
                <div className="content-wrapper1">
                  <div className="total">
                    {getFullName(
                      loan.borrower.firstName,
                      loan.borrower.lastName
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list3">
          <div className="row18">
            <div className="principle-amount2">Principle Amount</div>
            <div className="div56">{numberWithCommaINR(loan.amount)}</div>
          </div>
          <div className="row18">
            <div className="principle-amount2">Interest Rate</div>
            <div className="div56">{`${loan.interestRate}%`}</div>
          </div>
          <div className="row18">
            <div className="principle-amount2">Tenure</div>
            <div className="div56">{months2years(loan.tenureMonths)}</div>
          </div>
          <div className="divider1" />
          <div className="row21">
            <div className="total">Total</div>
            <div className="div58">
              {numberWithCommaINR(
                parseFloat(loan.amount || 0) +
                  parseFloat(loan.interest || 0),
                true
              )}
            </div>
          </div>
        </div>
        <ButtonComponent
          className="cta5"
          buttonText={"Check Loan Details"}
          onClickHandler={() => handleCheckLoanDetailsClick(loan)}
        ></ButtonComponent>
      </div>
    ))
  }

  return (
    <div className="loggedinlandingloanslist">
      <Header />
      <div className="filters">
        <b className="title6" data-testid="filters">
          Filters
        </b>
        <RadioGroup className="section">
          <div className="section-title1">
            <div className="annual-interest-rate">Principal amount</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={principleAmountFilterData.zero}
              onChange={() => {
                setPrincipleAmountFilterData({
                  zero: true,
                  one: false,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`Any`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={principleAmountFilterData.one}
              onChange={() => {
                setPrincipleAmountFilterData({
                  zero: false,
                  one: true,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`< ₹ 1 Lakh`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={principleAmountFilterData.two}
              onChange={() => {
                setPrincipleAmountFilterData({
                  zero: false,
                  one: false,
                  two: true,
                  three: false,
                });
              }}
            />
            <div className="less-than">1 Lakh - 10 Lakhs</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={principleAmountFilterData.three}
              onChange={() => {
                setPrincipleAmountFilterData({
                  zero: false,
                  one: false,
                  two: false,
                  three: true,
                });
              }}
            />
            <div className="less-than">{`> 10 Lakhs`}</div>
          </div>
        </RadioGroup>
        <RadioGroup className="section">
          <div className="section-title1">
            <div className="annual-interest-rate">Annual Interest Rate</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={interestRateFilterData.zero}
              onChange={() => {
                setInterestRateFilterData({
                  zero: true,
                  one: false,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`Any`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={interestRateFilterData.one}
              onChange={() => {
                setInterestRateFilterData({
                  zero: false,
                  one: true,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`< 10%`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={interestRateFilterData.two}
              onChange={() => {
                setInterestRateFilterData({
                  zero: false,
                  one: false,
                  two: true,
                  three: false,
                });
              }}
            />
            <div className="less-than">10% - 15%</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={interestRateFilterData.three}
              onChange={() => {
                setInterestRateFilterData({
                  zero: false,
                  one: false,
                  two: false,
                  three: true,
                });
              }}
            />
            <div className="less-than">{`> 15%`}</div>
          </div>
        </RadioGroup>
        <RadioGroup className="section">
          <div className="section-title1">
            <div className="annual-interest-rate">Tenure</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={tenureFilterData.zero}
              onChange={() => {
                setTenureFilterData({
                  zero: true,
                  one: false,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`Any`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={tenureFilterData.one}
              onChange={() => {
                setTenureFilterData({
                  zero: false,
                  one: true,
                  two: false,
                  three: false,
                });
              }}
            />
            <div className="less-than">{`< 1 Year`}</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={tenureFilterData.two}
              onChange={() => {
                setTenureFilterData({
                  zero: false,
                  one: false,
                  two: true,
                  three: false,
                });
              }}
            />
            <div className="less-than">1-2 Years</div>
          </div>
          <div className="scale-option-parent">
            <Radio
              checked={tenureFilterData.three}
              onChange={() => {
                setTenureFilterData({
                  zero: false,
                  one: false,
                  two: false,
                  three: true,
                });
              }}
            />
            <div className="less-than">{`> 2 Years`}</div>
          </div>
        </RadioGroup>
      </div>
      <div
        className="loggedinlandingloanslist-child"
        data-testid="loans-listing"
      >
        {loading ? (
          <div className="loader-container">
            <CircularProgress
              style={{
                color: "#64748b",
              }}
            />
          </div>
        ) : (
         getLoanListHTML()
        )}
      </div>
    </div>
  );
};

export default LoansList;
