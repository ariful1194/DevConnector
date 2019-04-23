import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
export class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick = e => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboadrContent;
    if (profile === null || loading) {
      dashboadrContent = <Spinner />;
    } else {
      // check loged in user has profile data or not
      if (Object.keys(profile).length > 0) {
        dashboadrContent = (
          <div>
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}!</Link>
            </p>
            <ProfileActions />
            {/* {Todo: exp and edu} */}
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <div onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Profile
            </div>
          </div>
        );
      } else {
        //user is logged in and has no profile
        dashboadrContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}!</p>
            <p>You Have Not Yet SetUp A Profile,Please Add Some Info!</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboadrContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
