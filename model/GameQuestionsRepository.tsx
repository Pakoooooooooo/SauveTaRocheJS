import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { GameQuestionData, GameRepData, MapChangeData } from './GameQuestions';

/*Lit et stoque la liste des questions du csv*/
import gameQuestionsData from '../assets/gameQuestions/game_questions_final.json';

export function parseGameQuestions(): GameQuestionData[] {
  // Première passe : créer tous les objets avec des tableaux vides pour les conditions
  const questions: GameQuestionData[] = gameQuestionsData.map((item) => {
    const rep1 = new GameRepData(
      item.rep1.repText,
      item.rep1.price,
      item.rep1.happiness,
      item.rep1.mapChanges.map((mc: any) => new MapChangeData(mc.i, mc.j, mc.newType)),
      item.rep1.overlayChanges.map((oc: any) => new MapChangeData(oc.i, oc.j, oc.newType)),
      item.rep1.incomeChanges,
      item.rep1.explConseq
    );

    const rep2 = new GameRepData(
      item.rep2.repText,
      item.rep2.price,
      item.rep2.happiness,
      item.rep2.mapChanges.map((mc: any) => new MapChangeData(mc.i, mc.j, mc.newType)),
      item.rep2.overlayChanges.map((oc: any) => new MapChangeData(oc.i, oc.j, oc.newType)),
      item.rep2.incomeChanges,
      item.rep2.explConseq
    );

    const rep3 = new GameRepData(
      item.rep3.repText,
      item.rep3.price,
      item.rep3.happiness,
      item.rep3.mapChanges.map((mc: any) => new MapChangeData(mc.i, mc.j, mc.newType)),
      item.rep3.overlayChanges.map((oc: any) => new MapChangeData(oc.i, oc.j, oc.newType)),
      item.rep3.incomeChanges,
      item.rep3.explConseq
    );

    const rep4 = new GameRepData(
      item.rep4.repText,
      item.rep4.price,
      item.rep4.happiness,
      item.rep4.mapChanges.map((mc: any) => new MapChangeData(mc.i, mc.j, mc.newType)),
      item.rep4.overlayChanges.map((oc: any) => new MapChangeData(oc.i, oc.j, oc.newType)),
      item.rep4.incomeChanges,
      item.rep4.explConseq
    );

    return new GameQuestionData(
      item.questionText,
      [], // Temporairement vide
      item.prevRepCondition,
      [], // Temporairement vide
      item.prevRepNotCondition,
      item.caracter,
      rep1,
      rep2,
      rep3,
      rep4
    );
  });

  // Deuxième passe : remplir les références aux questions
  gameQuestionsData.forEach((item, index) => {
    questions[index].prevQuestCondition = item.prevQuestCondition.map(
      (idx: number) => questions[idx]
    );
    questions[index].prevQuestNotCondition = item.prevQuestNotCondition.map(
      (idx: number) => questions[idx]
    );
  });

  return questions;
}