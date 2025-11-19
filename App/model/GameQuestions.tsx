import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import * as Q from './GameQuestions';

/*GameQuestions implémente le format des questions du jeu*/

export class MapChangeData {
  i: number;
  j: number;
  newType: string;
  constructor(
    i: number,
    j: number,
    newType: string,
  ) {
    this.i = i
    this.j = j
    this.newType = newType
  }
}

export class GameRepData {
  repText: string;
  price: number;
  happiness: number;
  mapChanges: MapChangeData[];
  overlayChanges: MapChangeData[];
  chargesChange: number;
  explConseq: string;
  constructor(
    repText: string,
    price: number,
    happiness : number,
    mapChanges: MapChangeData[],
    overlayChanges: MapChangeData[],
    chargesChanges: number,
    explConseq: string,
  ) {
    this.repText = repText
    this.price = price
    this.happiness = happiness
    this.mapChanges = mapChanges
    this.overlayChanges = overlayChanges
    this.chargesChange = chargesChanges
    this.explConseq = explConseq
  }
}

export class GameQuestionData {
  questionText: string;
  prevQuestCondition: GameQuestionData[];
  prevRepCondition: number[];
  caracter: number;
  rep1: GameRepData;
  rep2: GameRepData;
  rep3: GameRepData;
  rep4: GameRepData;

  constructor(
    questionText: string,
    prevQuestCondition: GameQuestionData[],
    prevRepCondition: number[],
    caracter: number,
    rep1: GameRepData,
    rep2: GameRepData,
    rep3: GameRepData,
    rep4: GameRepData,
  ) {
    this.questionText = questionText;
    this.prevQuestCondition = prevQuestCondition
    this.prevRepCondition = prevRepCondition
    this.caracter = caracter
    this.rep1 = rep1
    this.rep2 = rep2
    this.rep3 = rep3
    this.rep4 = rep4
  }
}

export const Explication = new  Q.GameQuestionData("",[],[],1,
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, "")
)