import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom';
import "../index.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className={`navbar navbar-expand-lg fixed-top navbar-${this.props.state.theme}`} style={{background:this.props.state.theme==="dark"?"#4f676f52":"#f8f9fa4a"}}>
        <div className="container-fluid px-5 resnav">
          <Link className="navbar-brand" to="/">{this.props.title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end " id="navbarNavAltMarkup">
            <div className="navbar-nav gap-3">
              <Link className="nav-link active text-center"  aria-current="page" to="/" onClick={this.props.setfisrtloadfalse}>Home</Link>
              {this.props.cats.map((value, i)=>{
                  return  <Link key={i} className="nav-link active text-center text-capitalize" aria-current="page" to={`/${value}`} onClick={this.props.setfisrtloadfalse}>{value}</Link>
                })}
              <div className="form-check form-switch d-flex justify-content-center align-items-center">
                <input className="form-check-input" style={{ cursor: "pointer" }} onClick={this.props.theme} type="checkbox" id="flexSwitchCheckDefault" defaultChecked={this.props.state.theme === `dark` ? true : false} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
