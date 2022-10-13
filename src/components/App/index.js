import React, { useState } from 'react'
import Sketch from 'react-p5'
import './index.css'

class MyCircle {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
  }

  draw(p5) {
    p5.circle(this.x, this.y, this.radius)
  }

  update() {
    this.x += 1
    this.y += 1
  }
}

function App() {
  const [radiusTarget, setRadiusTarget] = useState(100)
  const [radius, setRadius] = useState(radiusTarget)

  const Circles = [
    new MyCircle(100, 100, radius),
    new MyCircle(300, 300, radius),
  ]

  const updateNumber = (e) => {
    const val = e.target.value
    if (e.target.validity.valid) setRadiusTarget(val)
  }

  // Use parent to render the canvas in this ref, without that p5 will render
  // the canvas outside your component.
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef)
  }

  // Do not use setState in the draw function or in functions that are executed
  // in the draw function. Please use normal variables or class properties for
  // these purposes.
  const draw = (p5) => {
    p5.background(255, 130, 20)
    Circles.forEach((circle) => circle.draw(p5))
    Circles.forEach((circle) => circle.update())
  }

  return (
    <div className='h-full w-full pt-10 flex flex-col items-center space-y-2'>
      <p className='font-bold text-2xl'>Welcome to react-p5js</p>
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
