import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './common/PrivateRoute';
import Student from './pages/Student';
// import RoomAction from "./pages/RoomActio;
import Staff from './pages/Staff';
import StudentPage from "./pages/StudentPage";
import AdminRoute from "./common/AdminRoute";
import ComplaintAdmin from "./pages/ComplaintAdmin"
import Contact from "./pages/Contact";
// import Student from "./pages/Student"
class Routes extends Component {
    render() {
        return (
            < div className="App" >
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/contact" component={Contact}></Route>
                    <PrivateRoute exact path="/studentPage" component={StudentPage}></PrivateRoute>
                    <AdminRoute exact path="/dashboard" component={Dashboard} />
                    <AdminRoute exact path="/student" component={Student} />
                    <AdminRoute exact path="/block" component={ComplaintAdmin} />
                    <AdminRoute exact path="/staff" component={Staff} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Redirect to="/login" />
                </Switch>
                {/* <Footer /> */}
            </div >
        )
    }

}

export default Routes;
