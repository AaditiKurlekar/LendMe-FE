import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./portfolio.scss";
import { loanStatus, urlRoutes } from "../../constants";
import { numberWithComma, numberWithCommaINR } from "../../utils/number-utils";
import Grid from "../../components/material-ui-components/grid/grid";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/material-ui-components/button/button-component";
import { Box, CircularProgress, IconButton, Modal } from "@mui/material";
import Back from "@mui/icons-material/ChevronLeft";
import { TextField } from "@mui/material";
import { create, read } from "../../utils/axios-utils";
import { toast } from "react-toastify";
import { getFullName } from "../../utils/string-utils";

const PortfolioPage = () => {
  const navigate = useNavigate();

  const [portfolioData, setPortfolioData] = useState(null);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyModalLoader, setAddMoneyModalLoader] = useState(false);
  const [addMoneyModalValue, setAddMoneyModalValue] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreementLoaderLoanId, setAgreementLoaderLoanId] = useState(-1);
  const [makingMillionaire, setMakingMillionaire] = useState(false);

  const borrowerChartData = [
    ["EMIs", "Count"],
    ["Paid", portfolioData?.emiPaidAsBorrower || 0],
    ["Unpaid", portfolioData?.emiPendingAsBorrower || 0],
  ];
  const lenderChartData = [
    ["EMIs", "Count"],
    ["Received", portfolioData?.emiReceivedAsLender || 0],
    ["Pending", portfolioData?.emiPendingAsLender || 0],
  ];

  const calculateTotalInterest = (loans) => {
    let interestValue = 0;
    loans.forEach((loan) => {
      loan.rps.forEach((installment) => {
        if (installment.isPaid) {
          interestValue += installment.interest || 0;
        }
      });
    });
    return interestValue;
  };

  const calculateEmiCount = (loans, paid) => {
    let count = 0;
    loans.forEach((loan) => {
      count += loan.rps.filter((installment) => {
        if (paid) {
          return installment.isPaid;
        } else {
          return !installment.isPaid;
        }
      }).length;
    });
    return count;
  };

  const getCombinedLoans = (lentLoans, borrowedLoans) => {
    const lent = lentLoans.map((loan) => {
      return { ...loan, loanType: "LEND" };
    });
    const borrowed = borrowedLoans.map((loan) => {
      return { ...loan, loanType: "BORROW" };
    });
    return [...lent, ...borrowed];
  };

  const refactorPortfolioData = (lentLoans, borrowedLoans) => {
    setPortfolioData({
      lentLoansCount: lentLoans.length,
      borrowedLoansCount: borrowedLoans.length,
      completedLoansCount: [...lentLoans, ...borrowedLoans].filter(
        (loan) => loan.loanStatus === loanStatus.COMPLETED
      ).length,
      totalInterestGained: calculateTotalInterest(lentLoans),
      totalInterestPaid: calculateTotalInterest(borrowedLoans),
      emiPaidAsBorrower: calculateEmiCount(borrowedLoans, true),
      emiPendingAsBorrower: calculateEmiCount(borrowedLoans, false),
      emiReceivedAsLender: calculateEmiCount(lentLoans, true),
      emiPendingAsLender: calculateEmiCount(lentLoans, false),
      loans: getCombinedLoans(lentLoans, borrowedLoans),
    });
  };

  useEffect(() => {
    (() => {
      getWalletBalance();
    })();
    (async () => {
      try {
        setLoading(true);
        const resp = await read("user/portfolio");
        if (resp && resp.status === "SUCCESS") {
          refactorPortfolioData(resp.data.user.lent, resp.data.user.borrowed);
        } else {
          toast.error("Error fetching user portfolio.");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  const getLoansGridColumns = () => [
    { id: "srNo", label: "SR. NO.", minWidth: 80 },
    { id: "secondPartyName", label: "2nd PARTY NAME", minWidth: 150 },
    { id: "loanType", label: "LOAN TYPE", minWidth: 120 },
    { id: "principal", label: "PRINCIPAL", minWidth: 140 },
    { id: "interestRate", label: "INTEREST RATE", minWidth: 140 },
    { id: "loanStatus", label: "LOAN STATUS", minWidth: 140 },
    { id: "agreementUrl", label: "AGREEMENT", minWidth: 140 },
  ];

  const getLoanTypeBox = (type) => {
    if (type === "LEND") {
      return (
        <div className="green-wrapper">
          <div className="loan-type-text">LEND</div>
        </div>
      );
    } else if (type === "BORROW") {
      return (
        <div className="red-wrapper">
          <div className="loan-type-text">BORROW</div>
        </div>
      );
    }
  };

  const getWalletBalance = async () => {
    const resp = await read("user/wallet");
    if (resp && resp.status === "SUCCESS") {
      setWalletBalance(resp.data.wallet.amount);
    } else {
      toast.error("Error fetching balance");
    }
  };

  const makeMeMillionare = async () => {
    setMakingMillionaire(true);
    const resp = await create("user/wallet/deposit/make-me-millionaire");
    if (resp && resp.status === "SUCCESS") {
      await getWalletBalance();
      toast.success(resp.data.message);
    } else {
      toast.error("Error fetching balance");
    }
    setMakingMillionaire(false);
  }

  const getAgreementButton = (loan) => {
    if ([loanStatus.COMPLETED, loanStatus.ACTIVE].includes(loan.loanStatus)) {
      return (
        <div
          className="buttons6"
          onClick={(e) => handleAgreementClick(e, loan)}
        >
          {" "}
          {agreementLoaderLoanId === loan.id ? (
            <CircularProgress
              style={{ color: "white", width: "20px", height: "20px" }}
            />
          ) : (
            <img className="icon8" alt="" src="/icon3.svg" />
          )}
        </div>
      );
    } else {
      return (
        <div className="buttons6 buttons6-disabled">
          <img className="icon8" alt="" src="/icon3.svg" />
        </div>
      );
    }
  };

  const getLoanStatusBox = (status) => {
    if ([loanStatus.COMPLETED, loanStatus.ACTIVE].includes(status)) {
      return (
        <div className="green-wrapper">
          <div className="loan-type-text">{status}</div>
        </div>
      );
    } else if ([loanStatus.DISABLED, loanStatus.EXPIRED].includes(status)) {
      return (
        <div className="red-wrapper">
          <div className="loan-type-text">{status}</div>
        </div>
      );
    } else if (loanStatus.REQUESTED === status) {
      return (
        <div className="yellow-wrapper">
          <div className="loan-type-text">{status}</div>
        </div>
      );
    }
  };

  const prepareLoansGridData = (loans) => {
    return loans.map((loan, index) => {
      return {
        loanId: loan.id,
        type: loan.loanType,
        status: loan.loanStatus,
        srNo: index + 1,
        secondPartyName:
          loan.loanType === "BORROW"
            ? loan.lender
              ? getFullName(loan.lender.firstName, loan.lender.lastName)
              : "---"
            : getFullName(loan.borrower.firstName, loan.borrower.lastName) ||
              "---",
        loanType: getLoanTypeBox(loan.loanType),
        principal: numberWithCommaINR(loan.amount || 0, true),
        interestRate: `${loan.interestRate || 0}%`,
        loanStatus: getLoanStatusBox(loan.loanStatus),
        agreementUrl: getAgreementButton(loan),
      };
    });
  };

  const handleAgreementClick = async (e, loan) => {
    e.stopPropagation();
    try {
      setAgreementLoaderLoanId(loan.id);
      const token = localStorage.getItem("accessToken");
      const url = `${process.env.REACT_APP_HOST_URL}/loan/${loan.id}/agreement?render=1`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(url, options)
        .then((res) => res.blob())
        .then((blob) => {
          var file = window.URL.createObjectURL(blob);
          window.open(file);
        });
      setAgreementLoaderLoanId(-1);
    } catch (err) {
      toast.error("Error downloading agreement");
    }
  };

  const onClickRow = (row) => {
    if ([loanStatus.ACTIVE, loanStatus.COMPLETED].includes(row.status)) {
      navigate(`${urlRoutes.existingLoanDetail}/${row.loanId}`, {
        state: { source: "portfolio", loanType: row.type },
      });
    }
  };

  const handleAddMoneyClick = () => {
    setShowAddMoneyModal(true);
  };
  const modalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleCloseAddMoneyModal = () => {
    setShowAddMoneyModal(false);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleSubmitAddMoneyModal = async (e = null) => {
    if (e) {
      e.preventDefault();
    }
    try {
      setAddMoneyModalLoader(true);
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const resp = await create("user/wallet/deposit", {
        amount: parseInt(addMoneyModalValue),
      });
      if (resp && resp.status === "SUCCESS") {
        const { key, name, orderId, prefill } = resp.data.order;

        const options = {
          key,
          amount: addMoneyModalValue,
          name,
          description: "Test Transaction",
          order_id: orderId,
          prefill,
          handler: async function (response) {
            const result = await read(`user/wallet/deposit/status/${orderId}`);
            if (result && result.status === "SUCCESS") {
              await getWalletBalance();
              setAddMoneyModalLoader(false);
              toast.success("Money has been added to the wallet");
              setShowAddMoneyModal(false);
            } else {
              toast.error("Something went wrong");
              setAddMoneyModalLoader(false);
            }
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setAddMoneyModalLoader(false);
    }
  };

  return (
    <div className="portfoliopage">
      <Header />
      <Modal
        open={showAddMoneyModal}
        onClose={handleCloseAddMoneyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalBoxStyle }}>
          <form
            className="edit-data"
            onSubmit={(e) => handleSubmitAddMoneyModal(e)}
          >
            <div className="profile-header">
              <div
                className="back-btn"
                onClick={() => handleCloseAddMoneyModal()}
              >
                <IconButton aria-label="delete" disabled color="primary">
                  <Back />
                </IconButton>
              </div>
              <h3 clasname="page-name"> Add Money </h3>
            </div>


            <div className="user-data">
              <TextField
                className="user-data-item"
                color="primary"
                variant="outlined"
                type={"number"}
                name="money"
                id="money"
                label="₹"
                placeholder="Add money in Rupees"
                size="medium"
                margin="none"
                value={addMoneyModalValue}
                fullWidth
                onChange={(e) => setAddMoneyModalValue(e.target.value)}
              />
            </div>

            <div className="edit-modal-btns">
              <ButtonComponent
                className="edit-modal-btn"
                buttonText="Cancel"
                type="cancel"
                style={{ color: "grey", backgroundColor: "#D8D1D1" }}
                onClickHandler={() => {
                  handleCloseAddMoneyModal();
                }}
              />
              <ButtonComponent
                className="edit-modal-btn"
                buttonText={
                  addMoneyModalLoader ? (
                    <CircularProgress
                      style={{ color: "white", width: "27px", height: "27px" }}
                    />
                  ) : (
                    "Continue"
                  )
                }
                type="submit"
                style={{
                  minWidth: "311px",
                  backgroundColor: "#047857",
                }}
                disabled={
                  !addMoneyModalValue.length ||
                  !parseInt(addMoneyModalValue) > 0
                }
              />
            </div>
          </form>
        </Box>
      </Modal>
      {loading ? (
        <div className="loader-container">
          <CircularProgress style={{ color: "#64748b" }} />
        </div>
      ) : portfolioData ? (
        <>
          <div className="settings3">
            <div className="top8">
              <div className="portfolio5">Portfolio</div>
            </div>
          </div>
          <div className="info2">
            <div className="content23">
              <b className="title15">{portfolioData.lentLoansCount || 0}</b>
              <div className="subtitle18">Loans Lent</div>
            </div>
          </div>
          <div className="info3">
            <div className="content23">
              <b className="title15">{portfolioData.borrowedLoansCount || 0}</b>
              <div className="subtitle18">Loans Borrowed</div>
            </div>
          </div>
          <div className="info4">
            <div className="content23">
              <b className="title15">
                {portfolioData.completedLoansCount || 0}
              </b>
              <div className="subtitle18">Loans Completed</div>
            </div>
          </div>
          <div className="stats1">
            <div className="stat3">
              <div className="line-parent1">
                <div className="frame-child3" />
                <div className="total-interest-gained-parent">
                  <div className="total-interest-gained">
                    Total Interest Gained
                  </div>
                  <b className="b3">
                    {numberWithCommaINR(
                      portfolioData.totalInterestGained || 0,
                      true
                    )}
                  </b>
                </div>
              </div>
              <div className="badge3" />
            </div>
            <div className="stat3">
              <div className="line-parent1">
                <div className="frame-child3" />
                <div className="total-interest-gained-parent">
                  <div className="total-interest-gained">{`Total Interest Paid `}</div>
                  <b className="b3">
                    {numberWithCommaINR(
                      portfolioData.totalInterestPaid || 0,
                      true
                    )}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <img className="divider-icon2" alt="" src="/divider2.svg" />
          <div className="energy-summary-parent">
            <div className="energy-summary">
              <Chart
                chartType="PieChart"
                data={borrowerChartData}
                options={{ colors: ["#34D399", "#FCD34D"], title: "BORROWER" }}
                width={"400px"}
                height={"200px"}
              />
              <div className="content26">
                <div className="natonal-avg">
                  <div className="content22">
                    <div className="subtitle21">EMIs paid</div>
                    <b className="title19">
                      {portfolioData.emiPaidAsBorrower || 0}
                    </b>
                  </div>
                </div>
                <div className="natonal-avg">
                  <div className="content22">
                    <div className="subtitle21">EMIs unpaid</div>
                    <b className="title19">
                      {portfolioData.emiPendingAsBorrower || 0}
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="energy-summary1">
              <div>
                <Chart
                  chartType="PieChart"
                  data={lenderChartData}
                  options={{ colors: ["#34D399", "#FCD34D"], title: "LENDER" }}
                  width={"400px"}
                  height={"200px"}
                />
              </div>
              <div className="content26">
                <div className="natonal-avg">
                  <div className="content22">
                    <div className="subtitle21">EMIs received</div>
                    <b className="title19">
                      {portfolioData.emiReceivedAsLender || 0}
                    </b>
                  </div>
                </div>
                <div className="natonal-avg">
                  <div className="content22">
                    <div className="subtitle21">EMIs pending</div>
                    <b className="title19">
                      {portfolioData.emiPendingAsLender || 0}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table1">
            <Grid
              totalCount={portfolioData.loans}
              rows={prepareLoansGridData(portfolioData.loans)}
              columns={getLoansGridColumns()}
              showPagination={false}
              onClickHandler={onClickRow}
            />
          </div>
          <div className="wallet-details">Wallet Details</div>
          <div className="loan-details1">Loan Details</div>
          <div className="frame-parent">
            <div className="frame-group">
              <div className="parent">
                <b className="b6">
                  {numberWithCommaINR(walletBalance || 0, true)}
                </b>
                <div className="keep-your-wallet">
                  {" "}
                  Keep your wallet balance updated for your upcoming EMIs
                </div>
              </div>
              <div className="buttons-wrapper" onClick={handleAddMoneyClick}>
                <div className="buttons14">
                  <img className="icon8" alt="" src="/icon11.svg" />
                  <div className="loan-type-text">Add Money</div>
                </div>
              </div>
              
            </div>
            {/* <div className="buttons-wrapper" style={{margin: 'auto'}} onClick={makeMeMillionare}>
                <div className="buttons14">
                {makingMillionaire ? (
                    <CircularProgress
                      style={{ color: "white", width: "20px", height: "20px" }}
                    />
                  ) : <></>}
                  <div className="loan-type-text">Make me millionaire!</div>
                </div>
              </div> */}
            <div className="frame-child6" />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PortfolioPage;
