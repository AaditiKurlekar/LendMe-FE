import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Grid from "../../components/material-ui-components/grid/grid";
import "./loan-detail.scss";
import { loanStatus, urlRoutes } from "../../constants";
import { numberWithCommaINR } from "../../utils/number-utils";
import { formatDate, months2years } from "../../utils/date-utils";
import { getFullName } from "../../utils/string-utils";
import { create, read } from "../../utils/axios-utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, CircularProgress, IconButton, Modal } from "@mui/material";
import Back from "@mui/icons-material/ChevronLeft";
import ButtonComponent from "../../components/material-ui-components/button/button-component";

const LoanDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investModalLoader, setInvestModalLoader] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const onClickBackIcon = () => {
    navigate(urlRoutes.loggedInLandingLoansList);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await read(`loan/${id}`);
        if (resp && resp.status === "SUCCESS") {
          setLoan(resp.data.loan);
          setLoading(false);
        } else {
          toast.error("Something went wrong");
          setLoading(false);
        }
      } catch (err) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    })();
  }, [id]);

  const getEmiGridColumns = () => [
    { id: "srNo", label: "SR. NO.", minWidth: 80 },
    { id: "dueDate", label: "DUE DATE", minWidth: 170 },
    { id: "emi", label: "EMI", minWidth: 170 },
    { id: "interest", label: "INTEREST", minWidth: 170 },
    { id: "principal", label: "PRINCIPAL", minWidth: 170 },
  ];

  const prepareEmiGridData = (rps) => {
    return rps
      .sort((a, b) => a.installment - b.installment)
      .map((emiData, index) => {
        return {
          srNo: emiData.installment,
          dueDate: formatDate(emiData.dueDate),
          emi: numberWithCommaINR(emiData.amount || 0, true),
          interest: numberWithCommaINR(emiData.interest || 0, true),
          principal: numberWithCommaINR(emiData.principal || 0, true),
          code: index,
        };
      });
  };

  const handleCloseInvestModal = () => {
    setShowInvestModal(false);
  };

  const handleSubmitInvestModal = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setInvestModalLoader(true);
    const resp = await create(`loan/${id}/invest`);
    if (resp && resp.status === "SUCCESS") {
      navigate(urlRoutes.loggedInLandingLoansList);
      toast.success(
        "Investment done successfully. Check the loan in your portfolio"
      );
    } else {
      toast.error(
        "There is a problem investing in the loan. Please check your wallet balance"
      );
    }
    setInvestModalLoader(false);
  };

  return (
    <div className="loandetailpage">
      <Header />
      <Modal
        open={showInvestModal}
        onClose={handleCloseInvestModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalBoxStyle }}>
          <form
            className="edit-data"
            onSubmit={(e) => handleSubmitInvestModal(e)}
          >
            <div className="profile-header">
              <div
                className="back-btn"
                onClick={() => handleCloseInvestModal()}
              >
                <IconButton aria-label="delete" disabled color="primary">
                  <Back />
                </IconButton>
              </div>
              <h4 clasname="page-name"> Are you sure you want to invest? </h4>
            </div>

            <div className="edit-modal-btns">
              <ButtonComponent
                className="invest-modal-btn-no"
                buttonText="No"
                type="cancel"
                style={{ color: "grey", backgroundColor: "#D8D1D1" }}
                onClickHandler={() => {
                  handleCloseInvestModal();
                }}
              />
              <ButtonComponent
                className="invest-modal-btn-yes"
                buttonText={
                  investModalLoader ? (
                    <CircularProgress
                      style={{ color: "white", width: "26px", height: "26px" }}
                    />
                  ) : (
                    "Yes"
                  )
                }
                type="submit"
                style={{
                  backgroundColor: "#047857",
                }}
              />
            </div>
          </form>
        </Box>
      </Modal>
      <div className="settings2">
        <div className="top5">
          <div className="icon-frame" onClick={onClickBackIcon}>
            <img className="icon3" alt="" src="/icon1.svg" />
          </div>
          <div className="loan-details" data-testid="loan-detail">
            Loan Details
          </div>
        </div>
      </div>
      {loan && !loading ? (
        <div>
          <div className="borrower-details">Borrower Details</div>

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
            {loan.loanStatus === loanStatus.REQUESTED && (
              <div className="cta4" onClick={() => setShowInvestModal(true)}>
                <div className="emi">INVEST NOW</div>
              </div>
            )}
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
                      {getFullName(
                        loan.borrower.firstName,
                        loan.borrower.lastName
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
                      {loan.borrower.mobile}
                    </div>
                  </div>
                </div>
                <div className="lighttel">
                  <img className="icons9" alt="" src="/icons3.svg" />
                  <div className="text6">
                    <div className="tel">Mail</div>
                    <div className="unrealoutlookcom">
                      {loan.borrower.email}
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

export default LoanDetailPage;
