# README

## Capicua Slam [Live Link](https://capicua-app.herokuapp.com/#/)

'Capicua Slam' is an Online 2-4 player Dominoes game. Versus up to 3 AI in offline mode or play with a friend. To win, be the first to 80 points. To win Capicua and an extra 25 points, your last domino must be playable on both ends of the board. Can you win and achieve Capicua Slam!?

![Splash](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/game_board.png "Splash Page")

### Technologies Used

This website is built off of the React, Javascript and Konva technologies for gameplay and animations. Backend is handled with Express and MongoDB. 

### Multi Functional Splash Page

The splash page has a diversity of technologies. What looks like 3-4 button sequences to start gameplay, the codebase is creating arguments to drop into the game constructor with every input captured. If the user decides to go online, the codebase is creating a server in the background. 

![Splash](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/start_play.png "Splash Page")
![Select UserName](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/start_user.png "Select UserName")
![Select Count](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/start_count.png "Select Count")
![Start Ready](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/start_rdy.png "Start Ready")

We did this using a master page and holding "state" of the current phase of the game. Once a phase of "multiplayerGameStart" is achieved.
Then all the essentials are prop threaded.

![Multi Start](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/multi_start.png "Multi Start")

### Technical Difficulties

Developing code that would display the other players invisible hands was a fun achievement because we never knew if there would be one, two, 
three players joining a game. Creating dynamic code that would handle all scenarios took serious planning and deep thinking and when it was
ready, it got the job done.

Photo displaying other players hand.

![Other Hand](https://github.com/StevenSuazo/Capicua/blob/main/frontend/src/assets/img/other_hand.png "Other Hand")

```
for(let j = currPlayerIdx; j < (currPlayerIdx + numPlayers); j++){

   allPlayers[j % numPlayers].playerIdx = (j % numPlayers);
   allPlayers[j % numPlayers].player = board.players[allPlayers[j % numPlayers].playerIdx];
   allPlayers[j % numPlayers].playerHand = allPlayers[j % numPlayers].player.hand;
   allPlayers[j % numPlayers].offSetCenter = ((allPlayers[j % numPlayers].playerHand.length / 2) * ((boneWidth / 3) + boneWidth));
   allPlayers[j % numPlayers].startBoxforPlayerHand = ((boardDimen / 2) - allPlayers[j % numPlayers].offSetCenter);
   allPlayers[j % numPlayers].renderedHandPlayer = renderHandFn(allPlayers[j % numPlayers].player,
            allPlayers[j % numPlayers].offSetCenter,
            allPlayers[j % numPlayers].playerIdx, currPlayerIdx)

}
```

# Below is our pre planning notes




## Background and Overview

#### 'Capicua Slam' is an Online 2-4 player Dominoes game. You may choose to versus 
up to 3 AI in offline mode. There exists a rule in Dominos/Dominoes where if the
player's last domino is playable on both ends of the board
then a "Capicua" is achieved and is awarded an extra 25 points. Upon succession of 
"Capicua" the board with trigger the SLAM animation/effect. Can you win and 
achieve Capicua Slam!?

#### We will need to:
 * Create the board and gameplay logic
 * Create an interactive graphical interface for said board.
 * Create an online multiplayer infrastructure(gameplay && player to player interaction).
 * Build a database to store username win loss ratios
 * Create a toggle for an authentic carribean musical experience(audio player).

 ## Functionality & MVP

### Board
* Board Setup Graphics 
    * Placing Bones/Dominoes

  ### Gameplay
    * Play to win by Points (80)
        * At the end of a round the total sum of dots on remaining bones are rewarded to the winner
        * Database will save win/loss ratio per username
    * Quickmatch (2 or 4 players and up to 80 points to win)
    * Bonus:
        * AI player 

  ### Multiplayer functionality
    * 2 players versus or 4 players free for all
    * A chat feature will be availble for online mode.

  ### Audio player
    * Carribean music 
    * Perpetually playing(loops)
    * Plain/Mild/Caliente playlist

  ### Bonus
    * Gameplay AI
    * User Auth


## Technologies & Technical Challenges
    
### <ins>Board</ins>
### Technical Challenges

 We anticpate challenges with the viewbox when the length of the sides of the game pieces exceeds the dimensions of the visible board. Another challenge we foresee is syncing our game logic with the server.

### <ins>Gameplay</ins>
 Gameplay begins with players drawing 7 bones/dominoes. First player is decided by whom has the highest double(i.e. double 6 ... 5...4...3..etc.). The following player(s) may only play a bone if one of their bones has the same number of dots as either end of the gameboard. Otherwise... player must draw from the pile of remaining bones, if no bones are available, player skips their turn. A player wins when they have no remaining bones in their hand. The opponents dots on all remaining bones are added to the score of the winner. Except when the game achieves a "locked game" status (all players have no playable bones) then the winner of that rounds get all points from opponents minus their own dots on their remaining hand.

A capicua occurs when a player's winning bone can be played on either side of the board.(A capicua triggers a graphical effect).
        
### Technical Challenges

 Developing the Artificial Intelligence will prove significant difficulty to align with our game logic.

### <ins>Multiplayer functionality</ins>
 Abilty to allow a 2 player game or a 4 player team battle.

### Technical Challenges

 Learning how to use Socket.io for the joined online experience. Implementing a countdown timer to encourage continuous gameplay.

### <ins>Audio player</ins>
 A docked audio player for that authentic carribean music experience.


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



### Phase 1
 * Build skeleton of all components in React site - Yangel  & Sergio
    * By days end, render visual board component, bones components, highscore box
 * Setting up Database and creating guest player auth - Steven
    * By days end, be able to do test logins with guest accounts.
 * Start Game class, Board class, GamePiece class, Player class - Chris
    * By days end, be able to distribute 7 gamepieces to all players
 * Grab soundtracks from internets - Chris || Steven


### Phase 2
 * Beautify our component(s) CSS until game logic is ready - Yangel & Sergio
 * Test all the methods on the window - Steven
 * Setting up game and player logic - Steven & Chris


### Phase 3
 * Test gameplay functionality with css - Steven & Sergio
    * Directly followed by websocket interface setup (multiplayer)
 * Add graphical animations to end of game scene - Yangel
 * Websocket integration - Chris


### Phase 4
 * Testing multiplayer functionality and debugging - Steven & Sergio
 * Cleaning up CSS - Yangel & Chris


### Phase 5
 * Complete Production ReadMe & Prepare for Presentation - All

