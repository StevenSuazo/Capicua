# Capicua

## Background and Overview

#### Online 2-4 player Dominoes called 'Capicua Slam'. Filled with robust animations and genuine soundbites to match the authenticity of a real game of dominos. We will also build an AI opponent for offline play and include in game meters to achieve the SLAM! function in the game. We will also add in a game voice chat feature to allow players to interact and influence the game.

#### We will need to:
 * Create the board and gameplay logic
 * Create an interactive + mesmerizing graphical interface for said board.
 * Create an online multiplayer infrastructure(gameplay && player to player interaction).
 * Build a database to store user, bones, and highscore info.
 * Create a toggle for an authentic carribean musical experience(audio player).

 ## Functionality & MVP

### Board
* Board Setup Graphics 
    * Placing Bones/Dominoes
* Background/Graphics
    * Fire graphics on the screen when player is on fire
        * Fire is achieved with a certain streak of placed bones

  ### Gameplay
    * Play to win by Points (80 || 120 || 200)
        * At the end of a round the total sum of dots on remaining bones are rewarded to the winner
        * Database will save a Highscore.
    * Quickmatch (2 or 4 players and up to 80 points to win)
    * Bonus:
        * AI player 

  ### Multiplayer functionality
    * 2 players versus or 4 players on team
        * If 4 players then team mode initiates and enables live chat

  ### Audio player
    * Carribean music 
    * Perpetually playing with skip feature
    * Calm/Mild/Caliente playlist

  ### Bonus
    * Gameplay AI
    * User Auth


## Technologies & Technical Challenges
    
### <ins>Board</ins>
### Technical Challenges

The board set up animations will be technically challenging because game pieces will be shuffled and distributed to multiple player with animation. We also anticpate challenges with the viewbox when the length of the sides of the game pieces exceeds the dimensions of the visible board. Another challenge we foresee is syncing our game logic with our animations.

### <ins>Gameplay</ins>
 Gameplay begins with players drawing 7 bones/dominoes. First player is decided by whom has the highest double(i.e. double 6 ... 5...4...3..etc.). The following player(s) may only play a bone if one of their bones has the same number of dots as either end of the gameboard. Otherwise... player must draw from the pile of remaining bones, if not bones are available, player skips their turn. A player or team wins when they have no remaining bones in their hand. The opponents dots on all remaining bones are added to the score of the winner.

A capicua occurs when a player's winning bone can be played on either side of the board.(A capicua triggers a graphical effect). Please note that our games involves high levels of flashing lights and background music.
        
### Technical Challenges

 Developing the Artificial Intelligence will prove significant difficulty to align with our game logic.

### <ins>Multiplayer functionality</ins>
 Abilty to allow a 2 player game or a 4 player team battle.

### Technical Challenges

 Learning how to use Web Sockets for the joined online experience. Implementing external peripherals such as microphones for voice chat. Implementing a countdown timer to encourage continuous gameplay.

### <ins>Audio player</ins>
 A docked audio player for that authentic carribean music experience.

### Technical Challenges

 Harmonizing with voice chat. Disallowing music to be louder than incomming voice data to other players but then restoring volume to the music when voice chat stops.


## Accomplished over the Weekend
* this.readme
* Assigned team roles
* Familiarized ourselves with the game rules.
* All members of the team went through the MERN cirriculum.

## Group Members & Work Breakdown
* <ins>Chris Lopez</ins> - Official Flex
* <ins>Sergio Medina</ins> - Project Lead and secondary Flex
* <ins>Steven Suazo</ins> - Backend
* <ins>Yangel Aquilera</ins> - Frontend



### November 30 - Day 1
 * Build skeleton of all components in React site - Yangel  & Sergio
    * By days end, render visual board component, bones components, highscore box
 * Setting up Database and creating guest player auth - Steven
    * By days end, be able to do test logins with guest accounts.
 * Start Game class, Board class, GamePiece class, Player class - Chris
    * By days end, be able to distribute 7 gamepieces to all players
 * Grab soundtracks from internets - Chris || Steven


### December 1 - Day 2
 * Beautify our component(s) CSS until game logic is ready - Yangel & Sergio
 * Test all the methods on the window - Steven
 * Setting up game and player logic - Steven & Chris


### December 2 - Day 3
 * Test gameplay functionality with css - Steven & Sergio
    * Directly followed by websocket interface setup (multiplayer)
 * Add graphical animations to end of game scene as well as "player on fire" - Yangel
 * Websocket integration and peripheral permissions for voice chat - Chris


### December 3 - Day 4
 * Testing multiplayer functionality and debugging - Steven & Sergio
 * Cleaning up CSS - Yangel & Chris


### December 4 - Day 5
 * Complete Production ReadMe & Prepare for Presentation - All
