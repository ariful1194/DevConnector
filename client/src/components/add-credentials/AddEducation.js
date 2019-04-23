import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";
export class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const edudata = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(edudata, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add Any School, Bootcamp, etc That You Have Attented
              </p>
              <small className="d-block pb-3">* = Required Field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree Or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field Of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    id="current"
                    className="form-check-input"
                    value={this.state.current}
                    onChange={this.onCheck}
                    checked={this.state.checked}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell Us About The Program that you were in."
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-block btn-info mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
