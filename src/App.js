import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  constructor()
  {
    super();
    console.log();
    this.state = {
      theme:localStorage.getItem("theme")?localStorage.getItem("theme"):"light",
      coutryCode:"",
      firstload:false,
      progress:0
    }
    document.body.style.backgroundColor = this.state.theme==="light"?"white":"#070809";

    this.codes = ["ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"];
    this.cats= ["business","entertainment","health","science","sports","technology"];
    this.title = "Super News";
    
  }

  componentDidMount()
  {
    this.fetchCountry();
  }

  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }

  countryChange = (e)=> {
    this.setState({
      coutryCode:e.target.value
    }, ()=>{
        this.refs.child.restState();
    })
    
  }
  

  setfisrtloadfalse=()=>{
    this.fetchCountry();
    this.setState({
      firstload:false
    })
  }

  fetchCountry = async()=>{
    let res = await fetch("https://ipapi.co/json/");
    let data = await res.json();
    this.setState({coutryCode:data.country_code.toLocaleLowerCase()}, ()=>{
      this.refs.child.fetchPost();
      this.refs.child.setloadingfalse();
      this.setState({
        firstload:true
      })
      
    });
  }




  theme = () =>{
    if(this.state.theme==="light")
    {
      this.setState({
        theme:"dark"
      });
      localStorage.setItem("theme", "dark");
      document.body.style.backgroundColor = "#070809";
    }
    else{
      this.setState({
        theme:"light"
      });
      localStorage.setItem("theme", "light");
      document.body.style.backgroundColor = "white";
    }
    
  }

  render() {
    return (
      <Router>
         <LoadingBar
        color='#0d6efd'
        height={3}
        progress={this.state.progress}
      />
        <Navbar title = {this.title}  theme = {this.theme} setfisrtloadfalse={this.setfisrtloadfalse} state={this.state} countryChange={this.countryChange}  cats={this.cats}  />
        <Routes>
          <Route exact path="/" element={<News key={101} ref="child" setProgress={this.setProgress} firstload={this.state.firstload} title = {this.title} state={this.state}  category="general" coutryCode={this.state.coutryCode} fetchCountry={this.fetchCountry} codes={this.codes} cats={this.cats} countryChange={this.countryChange}  />} />
          {this.cats.map((value, index)=>{
            return <Route exact path={"/"+value} key={index} element={<News  title = {this.title} ref="child"  setProgress={this.setProgress} firstload={this.state.firstload} state={this.state} key={value}  category={value} coutryCode={this.state.coutryCode} fetchCountry={this.fetchCountry} codes={this.codes} cats={this.cats} countryChange={this.countryChange} />} />
          })}
        </Routes>
      </Router>
    )
  }
}