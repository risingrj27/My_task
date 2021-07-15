import React, { Component } from 'react'
import { connect } from "react-redux";
import { logout } from "../../actions/auth"
import { Link } from "react-router-dom"

class Home extends Component {
  render() {
    return (
      <div>


        {this.props.auth.isAuthenticated ? <div><button onClick={this.props.logout}>
          logout
        </button><Link>Create meeting</Link> <Link>Student</Link> </div> : <Link to="/login">Login</Link>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.errors,
});

export default connect(mapStateToProps, { logout })(Home);