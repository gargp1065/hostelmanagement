import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (auth.isAuthenticated === true &&  auth.user.admin === true)? (
                <Component {...props} />
            ) : (
                    <Redirect to="/studentPage" />
                )
        }
    />
);


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);