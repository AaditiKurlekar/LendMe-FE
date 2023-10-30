import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Header from "../../components/header/header";
import "./loan-request-form.scss";
import ButtonComponent from "../../components/material-ui-components/button/button-component";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { formatDate } from "../../utils/date-utils";
import { create } from "../../utils/axios-utils";
import { useNavigate } from "react-router-dom";
import { urlRoutes } from "../../constants";
import { toast } from "react-toastify";

const LoanRequestForm = () => {
  const initialValues = {
    principalAmount: "",
    interestRate: "",
    repaymentFrequency: "Monthly",
    tenure: "",
    loanPurpose: "",
    loanRequestExpiryDate: null,
    description: "",
    emiStartDate: null,
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const getMaturityDate = () => {
    return moment(formData.emiStartDate).add(
      parseInt(formData.tenure),
      "month"
    );
  };

  const handleLoanRequestSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const payload = {
      amount: parseFloat(formData.principalAmount),
      interestRate: parseFloat(formData.interestRate),
      payoutFrequency: formData.repaymentFrequency,
      emiStartDate: formatDate(formData.emiStartDate, "YYYY-MM-DD"),
      tenureMonths: formData.tenure,
      maturityDate: formatDate(getMaturityDate(), "YYYY-MM-DD"),
      purpose: formData.loanPurpose,
      expiryDate: formatDate(formData.loanRequestExpiryDate, "YYYY-MM-DD"),
      description: formData.description,
    };
    setLoading(true);

    const resp = await create("loan", payload);
    if (resp && resp.status === "SUCCESS") {
      navigate(urlRoutes.loggedInLandingLoansList);
      toast.success("Loan request has been successfully added");
    } else {
      toast.error("Something went wrong while creating loan request");
    }
    setLoading(false);
  };

  return (
    <div className="loanrequestform">
      <Header />
      <form className="sign-up" onSubmit={(e) => handleLoanRequestSubmit(e)}>
        <div className="top">
          <div className="title">
            <div className="loan-request-form-wrapper">
              <div
                className="loan-request-form"
                data-testid="loan-request-form"
              >
                Loan Request Form
              </div>
            </div>
          </div>
        </div>
        <div className="middle">
          <div className="inputs">
            <div className="name">
              <FormControl className="firstname" data-testid="principle-amount">
                <TextField
                  className="loan-request-form-field"
                  color="primary"
                  variant="outlined"
                  type="number"
                  name="principle_amount"
                  id="principle_amount"
                  label="Principal Amount (in Rs)"
                  placeholder="Enter principal amount"
                  size="medium"
                  required={true}
                  margin="none"
                  value={formData.principalAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val < 0 || val > 10000000 || val % 1 !== 0) {
                      return;
                    }
                    setFormData({
                      ...formData,
                      principalAmount: val,
                    });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormControl className="firstname">
                <TextField
                  className="loan-request-form-field"
                  color="primary"
                  variant="outlined"
                  type="number"
                  name="interest-rate"
                  id="interest-rate"
                  label="Interest Rate (% Annually)"
                  placeholder="Enter interest rate"
                  size="medium"
                  required={true}
                  margin="none"
                  value={formData.interestRate}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val < 0 || val > 100) {
                      return;
                    }
                    setFormData({ ...formData, interestRate: val });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="name">
              <FormControl className="firstname">
                <InputLabel>Repayment Frequency</InputLabel>
                <Select
                  className="loan-request-form-field"
                  type="text"
                  name="repayment-frequency"
                  id="repayment-frequency"
                  label="Repayment Frequency"
                  placeholder="Enter repayment frequency"
                  size="medium"
                  required={true}
                  margin="none"
                  value={formData.repaymentFrequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      repaymentFrequency: e.target.value,
                    })
                  }
                  disabled
                >
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="firstname">
                <TextField
                  className="loan-request-form-field"
                  color="primary"
                  variant="outlined"
                  type="number"
                  name="tenure"
                  id="tenure"
                  label="Tenure (in Months)"
                  placeholder="Enter tenure"
                  size="medium"
                  required={true}
                  margin="none"
                  value={formData.tenure}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val < 0 || val > 100) {
                      return;
                    }
                    setFormData({ ...formData, tenure: val });
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
            </div>
            <div className="name">
              <FormControl className="firstname">
                <TextField
                  className="loan-request-form-field"
                  color="primary"
                  variant="outlined"
                  type="text"
                  name="loan-purpose"
                  id="loan-purpose"
                  label="Loan purpose"
                  placeholder="Enter loan purpose"
                  size="medium"
                  required={true}
                  margin="none"
                  value={formData.loanPurpose}
                  onChange={(e) =>
                    setFormData({ ...formData, loanPurpose: e.target.value })
                  }
                />
              </FormControl>
              <FormControl className="firstname">
                <DatePicker
                  className="loan-request-form-field"
                  label="Loan Request Expiry Date"
                  value={formData.loanRequestExpiryDate}
                  required={true}
                  disablePast
                  onChange={(e) => {
                    setFormData({ ...formData, loanRequestExpiryDate: e });
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </FormControl>
            </div>
            <div className="name">
              <TextField
                className="loan-request-form-field description-field"
                color="primary"
                variant="outlined"
                type=""
                name="description"
                id="description"
                label="Description (optional)"
                placeholder="Enter description"
                size="medium"
                margin="none"
                value={formData.description}
                fullWidth={false}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <FormControl className="firstname">
                <DatePicker
                  className="loan-request-form-field"
                  label="EMI Start Date"
                  value={formData.emiStartDate}
                  required={true}
                  minDate={moment().add(1, "months")}
                  onChange={(e) => {
                    setFormData({ ...formData, emiStartDate: e });
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="bottom">
          <ButtonComponent
            className="cta14"
            buttonText={
              loading ? (
                <CircularProgress
                  style={{ color: "white", width: "28px", height: "28px" }}
                />
              ) : (
                "Request a loan"
              )
            }
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default LoanRequestForm;
