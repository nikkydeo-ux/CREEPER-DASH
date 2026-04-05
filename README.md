# 🟢 CREEPER DASH — Game Design Document

## Overview
Creeper Dash is a Geometry Dash-style endless runner/level-based platformer with Minecraft-inspired blocky pixel graphics. The player controls a Creeper character who must run, jump, and explode through increasingly dangerous Minecraft biomes, culminating in an escape from the Ender Dragon.

---

## Visual Style
- **Art style:** Blocky, pixel-art Minecraft aesthetic — all characters, obstacles, and environments use Minecraft-style textures and block geometry.
- **Camera:** Side-scrolling, auto-running (like Geometry Dash) — the world moves, the character stays roughly centered-left.
- **UI:** Minecraft-themed HUD (diamond counter, explode cooldown bar, score).

---

## Character: The Creeper
- Iconic green Creeper from Minecraft, rendered in blocky pixel art.
- Auto-runs forward — the player only controls jumping and the special ability.
- Has two actions:

### Controls
| Input | Action |
|---|---|
| Single tap `Spacebar` | Normal hop — small jump to clear low obstacles |
| Double tap `Spacebar` | 💥 Explode Jump — launches Creeper 4 blocks high AND destroys up to 4 blocks in the path |

### Explode Jump Rules
- Blasts the Creeper **4 blocks high** (significantly higher than the normal hop).
- **Destroys up to 4 blocks** that are directly in the Creeper's path/above it.
- Has a **10-second cooldown** after each use — player must time it carefully.
- A visible cooldown bar on the HUD shows when it's ready again.
- During cooldown the player can only use the normal hop.

---

## Collectibles
- 💎 **Diamonds** are scattered throughout every level.
- Collecting diamonds increases the player's score.
- Diamonds are the primary scoring/progression metric.

---

## Game Structure
The game follows the classic Minecraft progression across 4 stages:

### Stage 1 — 🌿 Overworld
- **Setting:** Grassy plains, dirt blocks, oak trees, stone paths.
- **Obstacles:** Cacti, Zombies, Skeletons walking into the path, falling Gravel/Sand blocks, gaps in the ground.
- **Tone:** Introductory difficulty — teaches the player normal jumps and basic timing.
- **Music vibe:** Upbeat Minecraft overworld style.

### Stage 2 — 🔥 The Nether
- **Setting:** Netherrack ground, lava pools, Nether brick structures, fire patches.
- **Obstacles:** Lava pits, Blazes shooting fireballs, Nether brick walls, falling Netherrack.
- **Tone:** Significantly harder — lava gaps require precise jumps, fireballs force the player to dodge mid-air.
- **Music vibe:** Dark, tense, ominous.

### Stage 3 — ⬛ The End
- **Setting:** Floating obsidian islands, void gaps, End Stone platforms.
- **Obstacles:** Endermen standing in the path, End Crystals that pulse damaging beams, large void gaps.
- **Tone:** Hardest platforming section — wide gaps make the Explode Jump essential and timing critical.
- **Music vibe:** Eerie, atmospheric.

### Stage 4 — 🐉 Ender Dragon Boss Escape
- **Setting:** The End — central island, with the Ender Dragon actively chasing the Creeper from behind.
- **Mechanic:** The Ender Dragon flies behind the player and periodically fires **purple dragon breath** blasts that travel across the ground and through the air.
- **Player objective:** Keep running, keep jumping, avoid the dragon breath projectiles.
- **Dragon breath behavior:** Comes in waves — ground-level blasts (require jumping over) and aerial blasts (require ducking or timing normal hops under them).
- **This stage ends** when the Creeper reaches the **End Portal** and leaps through it.
- **Tone:** Frantic, climactic — fastest auto-run speed of the whole game.

---

## Game Over & Restart
- Hitting any obstacle or dragon breath = instant death.
- Death animation: Creeper explodes (fitting!).
- Player is returned to the start of the current stage to retry.

---

## Victory Screen
- Triggered when the Creeper jumps through the End Portal at the end of Stage 4.
- Standard Geometry Dash-style victory screen showing:
  - 💎 Total diamonds collected
  - Final score
  - Option to replay

---

## HUD Elements
- 💎 **Diamond counter** — top left
- **Score** — top right
- **Explode cooldown bar** — bottom center (fills up over 10 seconds after use, glows green when ready)

---

## Technical Notes for Implementation
- **Engine suggestion:** Phaser 3 (JavaScript) or Pygame (Python) — both support sprite-based side-scrollers.
- **Sprites:** Use Minecraft-style 16x16 or 32x32 pixel block textures.
- **Auto-scroll speed:** Increases slightly as each new stage begins.
- **Collision detection:** Block-based, AABB (Axis-Aligned Bounding Box) style — fits the blocky aesthetic.
- **Explode jump:** Implement as an impulse force upward + raycasting 4 blocks ahead to destroy collidable blocks, with a 10,000ms cooldown timer.
- **Dragon breath:** Projectile objects spawned from off-screen right, traveling left at varying heights on a timer pattern.

---

## Summary Cheat Sheet
| Element | Detail |
|---|---|
| Genre | Auto-runner platformer |
| Style | Minecraft blocky pixel art |
| Character | Creeper |
| Normal jump | Single spacebar |
| Explode jump | Double tap spacebar — 4 blocks high, destroys 4 blocks, 10s cooldown |
| Collectible | Diamonds (score) |
| Stages | Overworld → Nether → The End → Ender Dragon escape |
| Win condition | Reach the End Portal |
| Loss condition | Hit obstacle or dragon breath |