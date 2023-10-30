import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Grid from "../../components/material-ui-components/grid/grid";
import "./existing-loan-detail.scss";
import { urlRoutes } from "../../constants";
import { numberWithCommaINR } from "../../utils/number-utils";
import { formatDate, months2years } from "../../utils/date-utils";
import { getFullName } from "../../utils/string-utils";
import { create, read } from "../../utils/axios-utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ExistingLoanDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loan, setLoan] = useState(null);
  const { loanType } = location.state;
  const [payEmiLoadingInstallment, setPayEmiLoadingInstallment] = useState(-1);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickBackIcon = () => {
    navigate(urlRoutes.portfolioPage);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await read(`loan/${id}`);
      if (resp && resp.status === "SUCCESS") {
        setLoan(resp.data.loan);
        setLoading(false);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    })();
  }, [id, refreshScreen]);

  const getEmiGridColumns = () => {
    const columns = [
      { id: "srNo", label: "SR. NO.", minWidth: 80 },
      { id: "dueDate", label: "DUE DATE", minWidth: 100 },
      { id: "emi", label: "EMI", minWidth: 100 },
      { id: "emiStatus", label: "STATUS", minWidth: 100 },
      { id: "interest", label: "INTEREST", minWidth: 100 },
      { id: "principal", label: "PRINCIPAL", minWidth: 100 },
    ];
    if (loanType === "BORROW") {
      columns.push({ id: "pay", label: " ", minWidth: 100 });
    }
    return columns;
  };

  const getEmiStatusBox = (isEmiPaid) => {
    if (isEmiPaid) {
      return (
        <div className="green-wrapper-detail">
          <div className="loan-type-text">Paid</div>
        </div>
      );
    } else {
      return (
        <div className="red-wrapper-detail">
          <div className="loan-type-text">Unpaid</div>
        </div>
      );
    }
  };

  const handlePayEmiClick = async (emiData) => {
    setPayEmiLoadingInstallment(emiData.installment);
    const resp = await create(
      `loan/${loan.id}/repayment/${emiData.installment}`
    );
    if (resp && resp.status === "SUCCESS") {
      toast.success("EMI paid successfully");
      setRefreshScreen(!refreshScreen);
    } else {
      toast.error("Error while paying EMI");
    }

    setPayEmiLoadingInstallment(-1);
  };

  const getPayEmiButton = (emiObj, activeEmiButtonRendered) => {
    if (emiObj.isPaid || activeEmiButtonRendered) {
      return <div className="buttons6 pay-emi pay-emi-disabled">Pay</div>;
    } else {
      return (
        <div
          className="buttons6 pay-emi pay-emi-green"
          onClick={() => handlePayEmiClick(emiObj)}
        >
          {payEmiLoadingInstallment == emiObj.installment ? (
            <CircularProgress
              style={{ color: "white", width: "20px", height: "20px" }}
            />
          ) : (
            "Pay"
          )}
        </div>
      );
    }
  };

  const prepareEmiGridData = (rps) => {
    let emiButtonDisplayed = false;
    return rps
      .sort((a, b) => a.installment - b.installment)
      .map((emiData, index) => {
        const row = {
          srNo: emiData.installment,
          dueDate: formatDate(emiData.dueDate),
          emi: numberWithCommaINR(emiData.amount || 0, true),
          emiStatus: getEmiStatusBox(emiData.isPaid),
          interest: numberWithCommaINR(emiData.interest || 0, true),
          principal: numberWithCommaINR(emiData.principal || 0, true),
          code: index,
        };
        if (loanType === "BORROW") {
          row["pay"] = getPayEmiButton(emiData, emiButtonDisplayed);
          if (row["pay"].props.className.includes("pay-emi-green")) {
            emiButtonDisplayed = true;
          }
        }
        return row;
      });
  };

  return (
    <div className="loandetailpage">
      <Header />

      <div className="settings2">
        <div className="top5">
          <div className="icon-frame" onClick={onClickBackIcon}>
            <img className="icon3" alt="" src="/icon1.svg" />
          </div>
          <div className="loan-details">Loan Details</div>
        </div>
      </div>
      {loan && !loading ? (
        <div>
          <div className="borrower-details">
            {loanType === "LEND" ? "Borrower" : "Lender"} Details
          </div>

          <div className="checkout2">
            <div className="list2">
              <div className="row12">
                <div className="principle-amount">Principal Amount</div>
                <div className="years">{numberWithCommaINR(loan.amount)}</div>
              </div>
              <div className="row12">
                <div className="principle-amount">Interest Rate</div>
                <div className="years">{`${loan.interestRate}%`}</div>
              </div>
              <div className="row12">
                <div className="principle-amount">Repayment Frequency</div>
                <div className="years">{loan.payoutFrequency}</div>
              </div>
              <div className="row12">
                <div className="principle-amount">Purpose</div>
                <div className="years">{loan.purpose || "---"}</div>
              </div>
              <div className="row12">
                <div className="principle-amount">Tenure</div>
                <div className="years">{months2years(loan.tenureMonths)}</div>
              </div>
              <div className="divider" />
              <div className="row17">
                <div className="maturity-amount">Maturity Amount</div>
                <div className="div9">
                  {numberWithCommaINR(loan.amount + (loan.interest || 0), true)}
                </div>
              </div>
            </div>
          </div>
          <div style={{position:'relative', top: '-80px'}}>
            
          <div className="loan-repayment-schedule">Loan Repayment Schedule</div>
          <div className="table">
            <Grid
              totalCount={loan.rps.length}
              rows={prepareEmiGridData(loan.rps)}
              columns={getEmiGridColumns()}
              showPagination={false}
            />
          </div>
          </div>
          <div className="card">
            <div className="content-frame">
              <b className="principle-amount">Loan Description</b>
            </div>
            <div className="paragraph">
              <div className="tel">{loan.description || "---"}</div>
            </div>
          </div>
          <div className="left-wrapper">
            <div className="user">
              <div className="container">
                <div className="content3">
                  <div className="content-frame">
                    <div className="maturity-amount">
                      {loanType === "LEND"
                        ? getFullName(
                            loan.borrower.firstName,
                            loan.borrower.lastName
                          )
                        : getFullName(
                            loan.lender?.firstName || "---",
                            loan.lender?.lastName || ""
                          )}
                    </div>
                  </div>
                  <div className="subtitle">Name</div>
                </div>
              </div>
            </div>
            <div className="left">
              <div className="introduction" />
              <div className="contact">
                <div className="lighttel">
                  <img className="icons9" alt="" src="/icons2.svg" />
                  <div className="text6">
                    <div className="tel">Tel</div>
                    <div className="unrealoutlookcom">
                      {loanType === "LEND"
                        ? loan.borrower.mobile
                        : loan.lender.mobile}
                    </div>
                  </div>
                </div>
                <div className="lighttel">
                  <img className="icons9" alt="" src="/icons3.svg" />
                  <div className="text6">
                    <div className="tel">Mail</div>
                    <div className="unrealoutlookcom">
                      {loanType === "LEND"
                        ? loan.borrower.email
                        : loan.lender.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <CircularProgress style={{ color: "#64748b" }} />
        </div>
      )}
    </div>
  );
};

export default ExistingLoanDetail;
