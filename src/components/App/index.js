import React, { useState } from 'react'
import Sketch from 'react-p5'
import { CLOSE_DISTANCE_THRESHOLD, HEIGHT, WIDTH } from './config'
import './index.css'
import { MyCircle } from './MyCircle'
import { getRandomInt } from './utils'

function App() {
  const [radiusTarget, setRadiusTarget] = useState(10)
  const [radius, setRadius] = useState(radiusTarget)

  const circles = [...Array(1000).keys()].map((_) => new MyCircle(radius))

  const updateNumber = (e) => {
    const val = e.target.value
    if (e.target.validity.valid) setRadiusTarget(val)
  }

  // Use parent to render the canvas in this ref, without that p5 will render
  // the canvas outside your component.
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef)
  }

  // Do not use setState in the draw function or in functions that are executed
  // in the draw function. Please use normal variables or class properties for
  // these purposes.
  const draw = (p5) => {
    p5.background(255, 130, 20)
    circles.forEach((circle) => circle.draw(p5))
    circles.forEach((circle) => circle.update())
    for (let i = 0; i < circles.length; i++) {
      for (let j = 0; j < circles.length; j++) {
        if (i === j) continue
        const disX = circles[i].x - circles[j].x
        const disY = circles[i].y - circles[j].y
        const distance = Math.sqrt(disX * disX + disY * disY)
        if (distance > CLOSE_DISTANCE_THRESHOLD) continue
        if (circles[i].status === 'SICK' && getRandomInt(100) <= 1)
          circles[j].status = 'SICK'
      }
    }
  }

  return (
    <div className='h-full w-full pt-10 flex flex-col items-center space-y-2'>
      <p className='font-bold text-2xl text-white px-2 rounded-md shadow-xl bg-gradient-to-r from-amber-300 to-blue-500'>
        Welcome to react-p5js
      </p>
      <div className='text-center'>
        <p>Yuren Hao</p>
        <p>Nanjing Foreign Language School</p>
        <p>Nanjing, 210000</p>
      </div>
      <Sketch setup={setup} draw={draw} />
      <div className='inline-flex rounded-md shadow-sm' role='group'>
        <button
          type='button'
          className='btn-left'
          onClick={() => setRadius(radius - 10)}
        >
          Smaller
        </button>
        <button
          type='button'
          className='btn-middle'
          onClick={() => setRadius(radiusTarget)}
        >
          Set to
        </button>
        <input
          type='text'
          id='size'
          className='btn-middle'
          placeholder='100'
          value={radiusTarget}
          onChange={updateNumber}
          pattern='^-?[0-9]\d*\.?\d*$'
        />
        <button
          type='button'
          className='btn-right'
          onClick={() => setRadius(radius + 10)}
        >
          Larger
        </button>
      </div>
    </div>
  )
}

export default App
