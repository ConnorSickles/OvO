class Sprite {
	constructor({ position, imageSrc, frameRate = 1 }){
		this.position = position
		this.image = new Image()
		this.image.onload = () => {
			this.loaded = true
			this.width = this.image.width / this.frameRate
			this.height = this.image.height
		}
		this.image.src = imageSrc
		this.loaded = false
		this.frameRate = frameRate
		this.currentframe = 0
		this.elapsedFrames = 0
		this.frameBuffer = 2
	}
	draw(){
		if(!this.loaded) return
			this.updateframes()

			const cropbox = {
				position: {
					x: this.width * this.currentframe,
					y:0,
				},
				width: this.width,
				height: this.height,
			}

		c.drawImage(
			this.image,
			cropbox.position.x,
			cropbox.position.y,
			cropbox.width,
			cropbox.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
			)

		this.updateframes
	}

	updateframes() {
		this.elapsedFrames++

		if (this.elapsedFrames % this.frameBuffer === 0) {
			if (this.currentframe < this.frameRate - 1) this.currentframe++
				else this.currentframe = 0
	}
	}
}