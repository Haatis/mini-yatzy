
import React, {useState, useEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Grid } from "react-native-easy-grid";

let board = [];
let board2 = [];
let board3 = [];
let board4 = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_POINTS = 6;
const POINTS_LEFT = 63;

        


export default function Gameboard() {
 const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
 const [nbrOfPointsLeft, setNbrOfPointsLeft] = useState(NBR_OF_POINTS);
 const [status, setStatus] = useState('');
 const [selectedDices,setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
 const [selectedPoints,setSelectedPoints] = useState(new Array(NBR_OF_POINTS).fill(false));
 const [totalPoints, setTotalPoints] =useState(0);
 const [pointsLeft, setPointsLeft] = useState(POINTS_LEFT);
 const [message, setMessage] = useState('');
 const [gameOn, setGameOn] = useState(true);
 function getDiceColor(i){ 
         return selectedDices[i] ? "black" : "steelblue";
 }
 function getPointColor(i) {
    return selectedPoints[i] ? "black" : "steelblue";
}
 useEffect(() => {
    checkWinner();
    if (nbrOfPointsLeft===0){
        setGameOn(false);
    }
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Throw dices');
    }
    if (nbrOfThrowsLeft < 0){
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
    if (pointsLeft===0 || pointsLeft<0) {
        setMessage(<Text style={styles.gameinfo}>You got the bonus!</Text>)
    } else {
        setMessage(<Text style={styles.gameinfo}>You are {pointsLeft} points away from bonus</Text>)
    }
    if(nbrOfPointsLeft===0){
        setStatus('Game Over');
    }
}, [nbrOfThrowsLeft]);
const row = [];
for (let i = 0; i < NBR_OF_DICES; i++){
    row.push(
        <Pressable
        key={"row" + i}
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
        name={board[i]}
        key={"row" + i}
        size={50}
        color={getDiceColor(i)}>
        </MaterialCommunityIcons>
        </Pressable>
    );
}

const row2 = [];
for (let i = 0; i < (NBR_OF_POINTS); i++){
    row2.push(
        <Pressable
        key={"row2" + i}
        onPress={() => selectPoint(i)}>
        <MaterialCommunityIcons
        name={board2[i]}
        key={"row2" + i}
        size={30}
        color={getPointColor(i)}>
        </MaterialCommunityIcons>
        </Pressable>
    );
}
const row3 = [];
  for (let i = 0; i< (NBR_OF_POINTS); i++){
    row3.push(
        <Grid>
        <Col style={styles.numbers} size={5}>
    {board4[i]}
    </Col>
    </Grid>
    );
  }






 function selectDice(i){
     if (nbrOfThrowsLeft===3 ){
         return
     } 
     let dices = [...selectedDices];
     dices[i] = selectedDices[i] ? false : true;
     setSelectedDices(dices);
 }


 function selectPoint(i){
    if(nbrOfPointsLeft===0){
        return
    }
    if(selectedPoints[i]===true){
        setStatus('You already selected points for ' + (i+1));
        return
    } else if (nbrOfThrowsLeft>0){
        setStatus('Throw 3 times before setting points')
        return

    }
    let points = [...selectedPoints];
    points[i] = selectedPoints[i]=true;
    setSelectedPoints(points);
    let numbers = i+1;
    let sum = 0;
    for(let x=0 ; x<NBR_OF_DICES; x++){
    
    if(numbers===board3[x]){
        sum+=board3[x];
        
    }

    
    board4[(i)]=sum;
    const sum1 =  board4.reduce((result,number)=> result+number);
    setTotalPoints(sum1);
    setPointsLeft(POINTS_LEFT-sum1);
    setNbrOfThrowsLeft(3);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setNbrOfPointsLeft(nbrOfPointsLeft-1);
   
}
}
 function throwDices() {
    if(nbrOfPointsLeft===0){
        return
    }
     if(nbrOfThrowsLeft===0){
         setStatus('select points for this turn');
         return
     }
     
    if(board4.length===0){
        board4=[0,0,0,0,0,0]
    }
     for (let i = 0; i< NBR_OF_DICES; i++) {
         if(!selectedDices[i]){
             let randomNumber = Math.floor(Math.random() * 6 + 1);
             board[i] = 'dice-' + randomNumber;
             board3[i] = randomNumber;
            
         }
         
     }
     for (let i = 0; i< NBR_OF_POINTS; i++) {
        board2[i] = 'numeric-' + (i+1) + '-circle';
}

     setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
 }
 function checkWinner(){
     
   if(nbrOfThrowsLeft === 0){
        setStatus('Select points');
       
     }  else{
         setStatus('keep on throwing');
     }
 }
 
 function newGame(){
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setNbrOfPointsLeft(NBR_OF_POINTS);
    setStatus('Throw dices');
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSelectedPoints(new Array(NBR_OF_POINTS).fill(false));
    setTotalPoints(0);
    setPointsLeft(POINTS_LEFT);
    setMessage('');
    setGameOn(true);
    board = [];
    board2 = [];
    board3 = [];
    board4 = [];
 }

 return(
     <View style={styles.gameboard}>
         <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <View style={styles.flex}>{row3}</View>
        <View style={styles.flex}>{row2}</View>
        <Text style={styles.gameinfo}>Points: {totalPoints}</Text>
        <View>{message}</View>
        <Text style={styles.gameinfo}></Text>
        
        {gameOn
        ?<Pressable style={styles.button}
        onPress={() => throwDices()}>
            <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>

        
        : <Pressable style={styles.button}
        onPress={() => newGame()}>
        <Text style={styles.buttonText}>
          New game
          </Text>
          </Pressable>
      }
     </View>
 )
}