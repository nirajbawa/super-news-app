import React, { Component } from 'react'
import Lottie from 'react-lottie';
import end from '../assets/lottiefiles/end.json'

export default class EndLoading extends Component {

  constructor()
  {
    super();
    this.defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: end
    };
  }  
  render() {
    return (
      <div className='my-5 d-felx justify-content-center align-items-center'>
         <Lottie 
	    options={this.defaultOptions}
        isClickToPauseDisabled={true}
        width={this.props.width}
        height={this.props.height}
      />
      </div>
    )
  }
}
