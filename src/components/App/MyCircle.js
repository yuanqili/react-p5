import { HEIGHT, WIDTH } from './config'
import { getRandomInt } from './utils'

export class MyCircle {
  constructor(radius) {
    this.x = getRandomInt(WIDTH)
    this.y = getRandomInt(HEIGHT)
    this.radius = radius
    this.status = 'HEALTH'
    this.hasImmunity = false
  }

  draw(p5) {
    switch (this.status) {
      case 'HEALTH':
        p5.fill(p5.color(0, 255, 0))
        break
      default:
        p5.fill(p5.color(255, 0, 0))
    }
    p5.circle(this.x, this.y, this.radius)
  }

  update() {
    this.move()
    this.suddenlySick()
    this.recover()
  }

  suddenlySick() {
    if (getRandomInt(1000) < 10) {
      this.status = 'SICK'
    }
  }

  recover() {
    if (this.status === 'SICK') {
      if (getRandomInt(1000) < 100) {
        this.status = 'HEALTH'
        if (getRandomInt(100) <= 60) this.hasImmunity = true
      }
    }
  }

  move() {
    switch (getRandomInt(4)) {
      case 0:
        this.x += 1
        this.y += 1
        break
      case 1:
        this.x += 1
        this.y -= 1
        break
      case 2:
        this.x -= 1
        this.y += 1
        break
      case 3:
        this.x -= 1
        this.y -= 1
        break
    }
  }
}
