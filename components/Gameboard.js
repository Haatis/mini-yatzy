
import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

let board = [];
let board2 = [];
let board3 = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const NBR_OF_POINTS = 6;
const WINNING_POINTS = 23;

export default function Gameboard() {
 const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
 const [status, setStatus] = useState('');
 const [selectedDices,setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
 const [selectedPoints,setSelectedPoints] = useState(new Array(NBR_OF_POINTS).fill(false));
 const [totalPoints, setTotalPoints] =useState(0);
 function getDiceColor(i) {
     if (board.every((val, i, arr) => val === arr[0])) {
         return "orange";
     }else {
         return selectedDices[i] ? "black" : "steelblue";
     }
 }
 function getPointColor(i) {
    return selectedPoints[i] ? "black" : "steelblue";
}
 useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0){
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
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



 function selectDice(i){
     let dices = [...selectedDices];
     dices[i] = selectedDices[i] ? false : true;
     setSelectedDices(dices);
 }

/*  function countPoints(i){
    selectedDices.length missä on true
 } */

 function selectPoint(i){
    let points = [...selectedPoints];
    points[i] = selectedPoints[i] ? false : true;
    setSelectedPoints(points);
    
}
 function throwDices() {
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
     if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
         setStatus('You won');
     } else if (board.every((val, i, arr) => val === arr[0] && nbrOfThrowsLeft === 0)){
         setStatus('you won, game over');
         setSelectedDices(new Array(NBR_OF_DICES).fill(false));
     } else if(nbrOfThrowsLeft === 0){
        setStatus('game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
     }  else{
         setStatus('keep on throwing');
     }
 }

 return(
     <View style={styles.gameboard}>
         <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <View style={styles.flex}>{row2}</View>
        <Text style={styles.gameinfo}>Points: {totalPoints}</Text>
        <Pressable style={styles.button}
        onPress={() => throwDices()}>
            <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
     </View>
 )
}