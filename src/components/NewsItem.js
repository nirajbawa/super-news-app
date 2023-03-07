import React, { Component } from 'react'
import "../index.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class NewsItem extends Component {
  componentDidMount()
  {
    AOS.init({
      offset: 0,
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true
    });
  }
  componentDidUpdate(){
    AOS.init({
      offset: 0,
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true
    });
  }
  render() {
    let {title, description, imgUrl, newsUrl, publishedAt, author, source} = this.props;
    return (
      <div className={this.props.state.theme===`dark`?`card bg-dark text-white`:`card`}   data-aos="fade-up"  style={{width: "18rem"}}>
        <div className='cardimg' style={{height:"12rem"}}>
          <div className='position-absolute w-100 d-flex justify-content-end p-1'>
          <span className="badge bg-primary text-light shadow-sm" style={{ top:"0.5rem", transition:"all 0.5s", zIndex:"50"}}>{source}</span>
          </div>
       
        <img src={imgUrl} alt="" referrerPolicy="no-referrer" className="card-img-top" style={{width:"100%", height:"100%"}}/>
     
        </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>   
            <p className="card-text">{author}</p>   
          </div>
          <div className="card-footer justify-content-between d-flex align-items-center" style={{backgroundColor:this.props.state.theme===`dark`?"#171a1dbf":"", fontSize:"0.7rem"}}>
          {publishedAt}
          <a href={newsUrl} target="__blank__" className="btn btn-primary" style={{fontSize:"0.9rem", padding:"6px"}}>Read More</a>
          </div>
      </div>
    )
  }
}