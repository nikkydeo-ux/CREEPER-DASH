const STAGES = {
  overworld: { bg: 0x87CEEB, name: '🌿 Overworld', obsKey: 'obs_stone'      },
  nether:    { bg: 0x1a0000, name: '🔥 The Nether', obsKey: 'obs_netherrack' },
  end:       { bg: 0x05050f, name: '⬛ The End',    obsKey: 'obs_obsidian'   }
}

export class GameScene extends Phaser.Scene {
  constructor() { super('GameScene') }

  // ─────────────────────────────────────────────
  //  TEXTURE GENERATION  (called once in create)
  // ─────────────────────────────────────────────
  generateTextures() {
    const g = this.make.graphics({ add: false })

    // ── CREEPER (32x32) ──────────────────────────
    g.clear()
    g.fillStyle(0x4aad52); g.fillRect(0, 0, 32, 32)       // body
    g.fillStyle(0x3a8a40); g.fillRect(0, 0, 32, 3)        // top shadow
    g.fillStyle(0x000000)
    g.fillRect(6, 8, 8, 8)                                 // left eye
    g.fillRect(18, 8, 8, 8)                                // right eye
    g.fillRect(10, 18, 4, 4); g.fillRect(18, 18, 4, 4)    // mouth top
    g.fillRect(10, 22, 12, 4)                              // mouth mid
    g.fillRect(10, 26, 4, 4); g.fillRect(18, 26, 4, 4)    // mouth corners
    g.generateTexture('creeper', 32, 32)

    // ── GRASS BLOCK (32x32) ──────────────────────
    g.clear()
    g.fillStyle(0x7a4a28); g.fillRect(0, 0, 32, 32)       // dirt
    g.fillStyle(0x5da832); g.fillRect(0, 0, 32, 8)        // grass top
    g.fillStyle(0x7fcc44); g.fillRect(2, 1, 4, 4)         // highlight
    g.fillStyle(0x6b4220); g.fillRect(6, 12, 2, 8)        // dirt lines
    g.fillRect(16, 10, 2, 10); g.fillRect(24, 14, 2, 8)
    g.generateTexture('grass_block', 32, 32)

    // ── NETHERRACK BLOCK (32x32) ─────────────────
    g.clear()
    g.fillStyle(0x661111); g.fillRect(0, 0, 32, 32)
    g.fillStyle(0x882222); g.fillRect(4, 4, 10, 8)
    g.fillRect(18, 16, 8, 6)
    g.fillStyle(0x440808); g.fillRect(8, 8, 4, 4)
    g.fillRect(20, 4, 4, 6); g.fillRect(2, 20, 4, 4)
    g.generateTexture('nether_ground', 32, 32)

    // Helper: draw a Minecraft-style block with pixel grid lines
    const drawBlock = (color, c1, c2, dark) => {
      g.clear()
      g.fillStyle(color);  g.fillRect(0, 0, 32, 32)
      g.fillStyle(c1);     g.fillRect(2, 2, 12, 12)   // top-left patch
      g.fillStyle(c2);     g.fillRect(18, 2, 10, 10)  // top-right patch
      g.fillStyle(c1);     g.fillRect(4, 18, 10, 10)  // bottom-left patch
      g.fillStyle(dark);   g.fillRect(16, 16, 14, 14) // dark corner
      // Pixel grid lines (Minecraft block edges)
      g.fillStyle(dark)
      g.fillRect(0, 0, 32, 1); g.fillRect(0, 0, 1, 32)   // top + left
      g.fillRect(31, 0, 1, 32); g.fillRect(0, 31, 32, 1)  // bottom + right
      g.fillRect(16, 0, 1, 32); g.fillRect(0, 16, 32, 1)  // mid cross
    }

    // ── STONE (32x32) ────────────────────────────
    drawBlock(0x999999, 0xbbbbbb, 0xaaaaaa, 0x666666)
    g.generateTexture('obs_stone', 32, 32)

    // ── NETHERRACK (32x32) ───────────────────────
    drawBlock(0xaa2222, 0xcc4444, 0xbb3333, 0x771111)
    g.generateTexture('obs_netherrack', 32, 32)

    // ── OBSIDIAN (32x32) ─────────────────────────
    drawBlock(0x1e0a38, 0x3a1870, 0x2a1050, 0x0d0520)
    g.generateTexture('obs_obsidian', 32, 32)

    // ── NETHER PORTAL (32x96) ────────────────────
    g.clear()
    g.fillStyle(0x220044); g.fillRect(0, 0, 32, 96)       // dark frame
    g.fillStyle(0xaa44ff); g.fillRect(4, 4, 24, 88)       // glow outer
    g.fillStyle(0xdd88ff); g.fillRect(8, 8, 16, 80)       // glow inner
    g.fillStyle(0xffffff); g.fillRect(10, 14, 4, 24)      // shimmer
    g.fillRect(10, 50, 4, 12)
    g.generateTexture('portal_nether', 32, 96)

    // ── END PORTAL (32x96) ───────────────────────
    g.clear()
    g.fillStyle(0x003333); g.fillRect(0, 0, 32, 96)
    g.fillStyle(0x00aaaa); g.fillRect(4, 4, 24, 88)
    g.fillStyle(0x44ffee); g.fillRect(8, 8, 16, 80)
    g.fillStyle(0xffffff); g.fillRect(10, 14, 4, 24)
    g.fillRect(10, 50, 4, 12)
    g.generateTexture('portal_end', 32, 96)

    // ── DIAMOND (16x16) ──────────────────────────
    g.clear()
    g.fillStyle(0x00ccff)
    g.fillRect(4, 0, 8, 2); g.fillRect(2, 2, 12, 2)      // top
    g.fillRect(0, 4, 16, 4)                               // wide middle
    g.fillRect(2, 8, 12, 2); g.fillRect(4, 10, 8, 2)     // bottom
    g.fillRect(6, 12, 4, 2); g.fillRect(7, 14, 2, 2)
    g.fillStyle(0x88eeff); g.fillRect(5, 2, 4, 3)        // highlight
    g.generateTexture('diamond', 16, 16)

    // ── BEDROCK (32x32) ──────────────────────────
    g.clear()
    g.fillStyle(0x1a1a1a); g.fillRect(0, 0, 32, 32)       // near-black base
    g.fillStyle(0x2a2a2a); g.fillRect(2, 2, 10, 8)        // lighter patches
    g.fillRect(16, 14, 12, 8); g.fillRect(6, 20, 8, 8)
    g.fillStyle(0x0d0d0d); g.fillRect(14, 4, 6, 6)        // dark spots
    g.fillRect(4, 16, 4, 4); g.fillRect(22, 6, 4, 4)
    g.lineStyle(2, 0x111111, 1); g.strokeRect(0, 0, 32, 32)
    g.generateTexture('bedrock', 32, 32)

    g.destroy()
  }

  // ─────────────────────────────────────────────
  //  CREATE
  // ─────────────────────────────────────────────
  create() {
    this.currentStage = 'overworld'
    this.obstacleCount = 0
    this.speed = 200

    this.generateTextures()

    // ── Ground ──────────────────────────────────
    // Layer 1: grass strip at surface
    this.groundGrass = this.add.tileSprite(400, 466, 800, 32, 'grass_block').setScrollFactor(0)
    // Layer 2: one block of dirt below grass
    this.groundDirt = this.add.rectangle(400, 498, 800, 32, 0x7a4a28).setScrollFactor(0)
    // Layer 3: stone starts at y=530 — world-space blocks fill y=514 with jagged tops
    this.groundStone = this.add.tileSprite(400, 565, 800, 70, 'obs_stone').setScrollFactor(0)
    // Layer 4: solid bedrock (always 1 block at the very bottom)
    this.bedrockSolid = this.add.tileSprite(400, 584, 800, 32, 'bedrock').setScrollFactor(0)

    // Physics: one wide invisible rectangle, top at y=450
    const groundPhys = this.add.rectangle(25000, 600, 50000, 300, 0x000000, 0)
    this.physics.add.existing(groundPhys, true)
    this.ground = this.physics.add.staticGroup()
    this.ground.add(groundPhys)

    // ── Obstacles & portals ─────────────────────
    this.obstacles = this.physics.add.staticGroup()
    this.portals   = this.physics.add.staticGroup()
    this.collectibles = this.physics.add.staticGroup()
    this.nextObstacleX = 500
    this.nextDiamondX  = 600   // first diamond slightly after first obstacle
    this.nextStoneX    = 0     // jagged stone edge, advances in 32px grid steps
    this.nextBedrockX  = 0     // random bedrock above solid layer

    // ── Creeper ─────────────────────────────────
    this.creeper = this.physics.add.image(150, 200, 'creeper')
    this.creeper.setCollideWorldBounds(false)
    this.physics.add.collider(this.creeper, this.ground)

    this.physics.add.overlap(this.creeper, this.obstacles, () => {
      this.scene.restart()
    })

    this.physics.add.overlap(this.creeper, this.portals, (creeper, portal) => {
      this.enterStage(portal.stageTarget)
      portal.destroy()
    })

    this.physics.add.overlap(this.creeper, this.collectibles, (creeper, diamond) => {
      this.diamonds++
      this.diamondText.setText('💎 ' + this.diamonds)
      diamond.destroy()
    })

    // ── Controls ────────────────────────────────
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.lastSpaceTime = 0
    this.explodeCooldown = false
    this.explodeFalling  = false  // true after explode jump until landing

    // ── HUD ─────────────────────────────────────
    this.diamonds = 0

    this.diamondText = this.add.text(16, 16, '💎 0', {
      fontSize: '20px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 3
    }).setScrollFactor(0)

    this.obsCountText = this.add.text(16, 44, 'Obstacles: 0', {
      fontSize: '16px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 3
    }).setScrollFactor(0)

    this.stageText = this.add.text(400, 16, STAGES.overworld.name, {
      fontSize: '20px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5, 0).setScrollFactor(0)

    this.cooldownText = this.add.text(400, 468, 'EXPLODE: READY', {
      fontSize: '16px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(100)

    // ── Camera ───────────────────────────────────
    this.cameras.main.startFollow(this.creeper, true, 1, 0)
    this.cameras.main.setFollowOffset(0, 0)
    this.cameras.main.scrollY = 0  // lock vertical — prevents underground spawning
    this.cameras.main.setBackgroundColor(STAGES.overworld.bg)
  }

  // ─────────────────────────────────────────────
  //  SPAWNING
  // ─────────────────────────────────────────────
  spawnNext(x) {
    this.obstacleCount++
    this.obsCountText.setText('Obstacles: ' + this.obstacleCount)

    // Speed up 50% every 10 obstacles
    if (this.obstacleCount % 10 === 0) {
      this.speed = Math.round(this.speed * 1.25)
    }

    if (this.obstacleCount === 25) {
      this.spawnPortal(x, 'nether')
    } else if (this.obstacleCount === 50) {
      this.spawnPortal(x, 'end')
    } else {
      this.spawnObstacle(x)
    }

    // Diamond every 10 obstacles — placed in the gap BEFORE the obstacle
    if (this.obstacleCount % 10 === 0) {
      const diamond = this.add.image(x - 150, 442, 'diamond')
      this.physics.add.existing(diamond, true)
      this.collectibles.add(diamond)
    }
  }

  spawnObstacle(x) {
    const tall = Phaser.Math.Between(0, 1) === 1

    const key = STAGES[this.currentStage].obsKey

    if (tall) {
      // Two stacked 32x32 textured images
      this.makeBlock(x, 418, key)
      this.makeBlock(x, 386, key)
    } else {
      this.makeBlock(x, 434, key)
    }
  }

  makeBlock(x, y, key) {
    const block = this.add.image(x, y, key)
    this.physics.add.existing(block, true)
    this.obstacles.add(block)
  }

  spawnPortal(x, stageTarget) {
    const key    = stageTarget === 'nether' ? 'portal_nether' : 'portal_end'
    const label  = stageTarget === 'nether' ? 'NETHER PORTAL' : 'END PORTAL'

    const portal = this.add.image(x, 402, key)
    this.physics.add.existing(portal, true)
    portal.stageTarget = stageTarget
    this.portals.add(portal)

    this.add.text(x, 350, label, {
      fontSize: '12px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5, 1)
  }

  // ─────────────────────────────────────────────
  //  STAGE TRANSITION
  // ─────────────────────────────────────────────
  enterStage(stage) {
    this.currentStage = stage
    this.speed = 200  // reset speed on dimension change
    this.cameras.main.setBackgroundColor(STAGES[stage].bg)
    this.stageText.setText(STAGES[stage].name)

    // Update ground tile texture
    const groundKey = stage === 'nether' ? 'nether_ground' : 'obs_obsidian'
    this.groundGrass.setTexture(groundKey)
    this.groundDirt.setFillStyle(stage === 'nether' ? 0x330000 : 0x0a0a1a)
    this.groundStone.setTexture(stage === 'nether' ? 'obs_netherrack' : 'obs_obsidian')

    const flash = this.add.text(400, 200, STAGES[stage].name, {
      fontSize: '36px', fill: '#fff', fontFamily: 'monospace',
      stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5).setScrollFactor(0)
    this.time.delayedCall(1500, () => flash.destroy())
  }

  // ─────────────────────────────────────────────
  //  UPDATE  (runs every frame)
  // ─────────────────────────────────────────────

  update(time, delta) {
    this.creeper.setVelocityX(this.speed)

    // Fall 1.25x faster — extra gravity only when moving downward (keeps jump height the same)
    if (this.creeper.body.velocity.y > 0 && this.explodeFalling) {
      this.creeper.body.velocity.y += 200 * (delta / 1000)  // 1.25x fall after explode jump
    }
    if (this.creeper.body.blocked.down) {
      this.explodeFalling = false  // reset when landed
    }

    // Scroll ground tile to match camera — gives infinite ground illusion
    this.groundGrass.tilePositionX  = this.cameras.main.scrollX
    this.groundStone.tilePositionX  = this.cameras.main.scrollX
    this.bedrockSolid.tilePositionX = this.cameras.main.scrollX

    // Random bedrock above the solid layer — grid-aligned, ~40% chance per column
    while (this.creeper.x + 700 > this.nextBedrockX) {
      if (Phaser.Math.Between(0, 4) < 2) {
        this.add.image(this.nextBedrockX, 552, 'bedrock')
      }
      this.nextBedrockX += 32
    }

    // Jagged stone edge — bottom row always present (connects to stone layer),
    // top row random (creates irregular dirt/stone boundary)
    while (this.creeper.x + 700 > this.nextStoneX) {
      this.add.image(this.nextStoneX, 514, 'obs_stone')           // always: flush with stone layer
      if (Phaser.Math.Between(0, 1) === 0) {                      // 50%: extends up into dirt
        this.add.image(this.nextStoneX, 482, 'obs_stone')
      }
      this.nextStoneX += 32
    }

    // Spawn obstacles ahead
    if (this.creeper.x + 700 > this.nextObstacleX) {
      this.spawnNext(this.nextObstacleX)
      this.nextObstacleX += Phaser.Math.Between(300, 600)
    }

    // Spawn decorative stone 3 blocks underground

    // Jump logic
    const onGround = this.creeper.body.blocked.down

    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      const now = time
      const timeSinceLast = now - this.lastSpaceTime

      if (timeSinceLast < 300 && !this.explodeCooldown) {
        this.doExplodeJump()
      } else if (onGround) {
        this.creeper.setVelocityY(-453)  // 4 blocks high
      }

      this.lastSpaceTime = now
    }
  }

  doExplodeJump() {
    this.creeper.setVelocityY(-640)  // 8 blocks high
    this.explodeFalling = true       // fall 1.25x faster on the way down
    this.explodeCooldown = true
    this.cooldownText.setText('EXPLODE: ...')
    this.cooldownText.setStyle({ fill: '#ff4444', stroke: '#000', strokeThickness: 4 })

    this.time.delayedCall(10000, () => {
      this.explodeCooldown = false
      this.cooldownText.setText('EXPLODE: READY')
      this.cooldownText.setStyle({ fill: '#fff', stroke: '#000', strokeThickness: 4 })
    })
  }
}
