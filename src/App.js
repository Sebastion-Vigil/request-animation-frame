// https://medium.com/swlh/beginners-guide-to-using-usestate-useeffect-react-hooks-489dd4bc8663
// https://codepen.io/HunorMarton/pen/zYONexq
// https://css-tricks.com/using-requestanimationframe-with-react-hooks/

import React, { Component } from 'react'
// import { render } from 'react-dom';
import './App.css'
// -> any comment with -> at beginning is mine
export default class App extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Football Animation',
      animationActive: false,
      top: '0px',
    }
  }
  // -> dilema is how to store requestAnimationFrame id in state 
  moveBall = () => { // -> now realize React classes are overrated
    let start = Date.now()
    let football = document.querySelector('.circle')
    let timer = requestAnimationFrame(function animateBall () {
      let interval = Date.now() - start
      football.style.top = interval / 3 + 'px'
      if (interval > 1000) {
        cancelAnimationFrame(timer) 
      } else {
        requestAnimationFrame(animateBall)
      }
    })
  }

  startAnimation = () => {
  
  }

  stopAnimation = () => {

  }

  animationHelper ({ duration, render, interpolator }) {
    // let bounceEaseOut = this.easeOut(this.bounce);
    let start = Date.now()
    let id = requestAnimationFrame(function animate (time) {
      let interval = (Date.now() - start) / duration
      if (interval > 1) interval = 1

      render(interpolator(interval), interval)

      if (interval < 1) {
        requestAnimationFrame(animate)
      }
    })
  }

  /**
   * Returns a wrapper for input function to reverse the bounce effect
   */
  easeOut = animation => {
    return interval => {
      return 1 - animation(1 - interval)
    }
  }

  /**
   *  Calculate the Y axis for bounce effect
   */
  bounce = interval => {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (interval >= (7 - 4 * a) / 11) {
        // 4 and 7 coefficient are used to control bounce and smooth y axis fall
        return -Math.pow((11 - 6 * a - 11 * interval) / 4, 2) + Math.pow(b, 2) // Math.pow(b, 2) to keep the same x axis for bounce
        // -Math.pow((11 - 6 * a - 11 * interval) / 4, 2) adjust the y axis up and down
      }
    }
  }

  bounceBall = () => {
    this.animationHelper({
      duration: 2000,
      render (yAxis, interval) {
        let football = document.querySelector('.circle')
        football.style.transform = `translateY(${yAxis *
          300}px) translateX(${interval * 300}px)` // adjust the y and x axes
      },
      interpolator: interval => this.easeOut(this.bounce)(interval)
    })
  }

  render () {
    return (
      <div className='container'>
        <img 
          className='circle' 
          alt='' 
          style={{
            top: this.state.top
          }}
          />
        <div className='button' ></div>
      </div>
    )
  }
}

/*     moveBall = () => {
        let start = Date.now();
        let football = document.querySelector(".circle")
    
        let timer = setInterval(function () {
          let interval = Date.now() - start;
    
          football.style.top = interval / 3 + 'px'; // move element down by 3px
    
          if (interval > 1000) clearInterval(timer); // stop animation
    
        }, 1000 / 60);
      }
   */

// bounceBall = () => {
//   let bounceEaseOut = this.easeOut(this.bounce)
//   let start = Date.now()
//   let football = document.querySelector('.circle')
//   let id = requestAnimationFrame(function animate (time) {
//     console.log(time)
//     let interval = (Date.now() - start) / 2000
//     if (interval > 1) interval = 1

//     football.style.top = bounceEaseOut(interval) * 300 + 'px' // adjust the y axis
//     football.style.left = interval * 300 + 'px' // adjust the x axis

//     if (interval < 1) {
//       requestAnimationFrame(animate)
//     }
//   })
// }
