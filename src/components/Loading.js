import React, { Component } from 'react'
import Lottie from 'react-lottie';
import spinner from '../assets/lottiefiles/spinner.json'

export default class Loading extends Component {

  constructor()
  {
    super();
    this.defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: spinner
    };
  }  
  render() {
    return (
      <div className='my-5'>
         <Lottie 
	    options={this.defaultOptions}
        height={this.props.height}
        width={this.props.width}
        isClickToPauseDisabled={true}
      />
      </div>
    )
  }
}
