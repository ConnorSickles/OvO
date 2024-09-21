class Player extends Sprite{
	constructor({
		CollisionBlocks = [], imageSrc, frameRate }) {
		super({imageSrc, frameRate})
		this.position = {
			x:200,
			y:195
		}


		this.velocity = {
			x:0,
			y:0,
		}

			this.sides = {
			bottom: this.position.y + this.height,
		}
		this.gravity = 1

		this.CollisionBlocks = CollisionBlocks
	}



	update() {
		//player hitbox
		c.fillStyle = 'rgba(0, 100, 255, 0.25)'

		this.position.x += this.velocity.x
		this.HorizontalCheck()
		this.applyGravity() 
		this.hitbox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: 45,
			height: 52,
		}

		c.fillRect(
			this.hitbox.position.x + 60,
			this.hitbox.position.y + 37,
			this.hitbox.width,
			this.hitbox.height
			)
		this.VerticalCheck()
	}

	HorizontalCheck () {
		for (let i = 0; i < this.CollisionBlocks.length; i++) {
			const CollisionBlock = this.CollisionBlocks [i]
			//if collision exists
			if (this.position.x <= CollisionBlock.position.x + CollisionBlock.width && 
				this.position.x + this.width >= CollisionBlock.position.x && 
				this.position.y + this.height >= CollisionBlock.position.y &&
				this.position.y <= CollisionBlock.position.y + CollisionBlock.height

				) {
				if (this.velocity.x < 0) {
					this.position.x = CollisionBlock.position.x + CollisionBlock.width + 0.01
					break
				}
				if (this.velocity.x > 0) {
					this.position.x = CollisionBlock.position.x - this.width - 0.01
					break
				}
			}

		}
	}
	applyGravity () {
		this.velocity.y += this.gravity
		this.position.y += this.velocity.y
	}
	VerticalCheck () {
		for (let i = 0; i < this.CollisionBlocks.length; i++) {
			const CollisionBlock = this.CollisionBlocks [i]
			//if collision exists
			if (this.hitbox.position.x <= CollisionBlock.position.x + CollisionBlock.width && 
				this.hitbox.position.x + this.hitbox.width >= CollisionBlock.position.x && 
				this.hitbox.position.y + this.hitbox.height >= CollisionBlock.position.y &&
				this.hitbox.position.y <= CollisionBlock.position.y + CollisionBlock.height

				) {
				if (this.velocity.y < 0) {
					this.velocity.y = 0
					this.position.y = CollisionBlock.position.y + CollisionBlock.height + 0.01
					break
				}
				if (this.velocity.y > 0) {
					this.velocity.y = 0
					const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
					this.position.y = CollisionBlock.position.y - offset - 0.01
					break
				}
			}
		}
	}
}