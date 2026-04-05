import Phaser from 'phaser'
import { GameScene } from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#87CEEB', // sky blue for Overworld
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 800 }, debug: false }
  },
  scene: [GameScene]
}

new Phaser.Game(config)
