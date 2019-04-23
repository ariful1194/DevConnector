import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile } from "../../actions/profileActions";

export class CreateProfile extends Component {
  state = {
    displayProfileInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors, displayProfileInputs } = this.state;
    let socialInput;
    if (displayProfileInputs) {
      socialInput = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile Url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile Url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile Url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile Url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.value}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    } else {
    }
    const options = [
      { label: "*select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },

      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 center">Create Your profile</h1>
              <p className="text-center lead">
                Let's get some info to make your profile stand out!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile url. Your fullname,company  name,nick name etc."
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or you word for."
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own Website or Company one."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your Location, city & state."
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated value. eg: (Html,CSS,React)"
                />
                <TextFieldGroup
                  placeholder="GitHub UserName"
                  name="githubsername"
                  value={this.state.githubsername}
                  onChange={this.onChange}
                  error={errors.githubsername}
                  info="Your GitHub UserName."
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself."
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayProfileInputs: !prevState.displayProfileInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInput}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
