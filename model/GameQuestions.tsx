import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import * as Q from './GameQuestions';

/*GameQuestions implémente le format des questions du jeu*/

// Un changement de carte à lieu à des coordonnées i,j et attribut un nouveau type à la case
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

// Une réponse à une question de jeu comprend :
// - un texte de réponse
// - un coût en crédits
// - un impact sur le bonheur des habitants
// - des changements de carte (cases de sol modifiées)
// - des changements de superposition (bâtiments modifiés)
// - un impact sur les revenus périodiques
// - une explication des conséquences
export class GameRepData {
  repText: string;
  price: number;
  happiness: number;
  mapChanges: MapChangeData[];
  overlayChanges: MapChangeData[];
  incomeChanges: number;
  explConseq: string;
  constructor(
    repText: string,
    price: number,
    happiness : number,
    mapChanges: MapChangeData[],
    overlayChanges: MapChangeData[],
    incomeChanges: number,
    explConseq: string,
  ) {
    this.repText = repText
    this.price = price
    this.happiness = happiness
    this.mapChanges = mapChanges
    this.overlayChanges = overlayChanges
    this.incomeChanges = incomeChanges
    this.explConseq = explConseq
  }
}

// Une question de jeu comprend :
// - un texte de question
// - des conditions préalables (questions/réponses) pour que la question puisse être posée
// - un personnage associé
// - quatre réponses possibles
export class GameQuestionData {
  questionText: string;
  prevQuestCondition: GameQuestionData[];
  prevRepCondition: number[];
  prevQuestNotCondition: GameQuestionData[];
  prevRepNotCondition: number[];
  caracter: number;
  rep1: GameRepData;
  rep2: GameRepData;
  rep3: GameRepData;
  rep4: GameRepData;

  constructor(
    questionText: string,
    prevQuestCondition: GameQuestionData[],
    prevRepCondition: number[],
    prevQuestNotCondition: GameQuestionData[],
    prevRepNotCondition: number[],
    caracter: number,
    rep1: GameRepData,
    rep2: GameRepData,
    rep3: GameRepData,
    rep4: GameRepData,
  ) {
    this.questionText = questionText;
    this.prevQuestCondition = prevQuestCondition
    this.prevRepCondition = prevRepCondition
    this.prevQuestNotCondition = prevQuestNotCondition
    this.prevRepNotCondition = prevRepNotCondition
    this.caracter = caracter
    this.rep1 = rep1
    this.rep2 = rep2
    this.rep3 = rep3
    this.rep4 = rep4
  }
}

// Une explication est représentée par une question sans conditions et des réponses vides, toujours amenée par la présentatrice
export const Explication = new  Q.GameQuestionData("",[],[],[],[],0,
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, ""),
  new Q.GameRepData("", 0, 0, [], [], 0, "")
)