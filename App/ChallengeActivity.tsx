import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import questionsData from './assets/questions.json';

function getDaysSinceJanuary1st(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // 1er janvier de l'année en cours
  
  const diffInMs = now.getTime() - startOfYear.getTime();
  
  const dayOfYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;
  
  return dayOfYear;
}

class QuestionData {
  questionText: string;
  rep1: string;
  rep2: string;
  rep3: string;
  rep4: string;
  correctRep: number;
  explaination?: string;
  source?: string;
  constructor(
    questionText: string,
    rep1: string,
    rep2: string,
    rep3: string,
    rep4: string,
    correctRep: number,
    explaination?: string,
    source?: string
  ) {
    this.questionText = questionText;
    this.rep1 = rep1;
    this.rep2 = rep2;
    this.rep3 = rep3;
    this.rep4 = rep4;
    this.correctRep = correctRep;
    this.explaination = explaination;
    this.source = source;
  }
}

// Fonction pour charger les questions depuis le JSON
function loadQuestionsFromJSON(): QuestionData[] {
  const questions: QuestionData[] = [];
  
  // Parcourir toutes les questions du JSON
  Object.values(questionsData).forEach((q: any) => {
    const questionData = new QuestionData(
      q.text,
      q.rep1,
      q.rep2,
      q.rep3,
      q.rep4,
      q.correctRep,
      q.explan,
      q.source
    );
    questions.push(questionData);
  });
  
  return questions;
}

const listQuestions: QuestionData[] = loadQuestionsFromJSON();

const Qindex = getDaysSinceJanuary1st();

const currentQuestion = listQuestions[Qindex];

function Question({ questionText }: { questionText: string }) {
  return (
    <View style={styles.question}>
      <Text style={styles.text}>{questionText}</Text>
    </View>
  );
}

function Comment({ isAnswered, isCorrect }: { isAnswered: boolean, isCorrect: boolean }) {
  if (!isAnswered) {
    if (isCorrect) {
    return <Text style={styles.commentWins}>Bravo ! 🎉</Text>;
  } else {
    return <Text style={styles.commentLoses}>Eh oui ...</Text>;
  }
  } else {
    return <Text style={styles.commentLoses}></Text>;
  }
}

function Explaination({ isAnswered, explaination, source }: { isAnswered?: boolean, explaination?: string; source?: string }) {
  if (explaination && !isAnswered) {
    return (
      <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={styles.text}>{explaination}</Text>
        {source && (
          <Text style={styles.subtext}>Source: {source}</Text>
        )}
      </View>
    );
  }
  return <View style={{ marginTop: 20, padding: 10 }}>
        <Text style={styles.text}></Text>
        {source && (
          <Text style={styles.subtext}></Text>
        )}
      </View>;
}

/* Answer Button Components */

function ButtonRep({
  txt,
  style,
  index,
  onSelect,
  selectedRep,
  correctRep,
}: {
  txt?: string;
  style?: object;
  index: number;
  onSelect: (index: number) => void;
  selectedRep: number | null;
  correctRep: number;
}) {
  let bg = '#070A28'; // couleur neutre de base
  let txtcolor = '#FFFFFF';

  // Jugement des couleurs - appliqué à tous les boutons après sélection
  if (selectedRep !== null) {
    if (index === correctRep) {
      bg = '#006417ff'; // bonne réponse : vert
      txtcolor = '#FFC900';
    } else if (index === selectedRep) {
      bg = '#81000dff'; // mauvaise réponse sélectionnée : rouge
      txtcolor = '#070A28';
    } else {
      bg = '#4a4a4a'; // autres réponses : gris foncé
      txtcolor = '#000000';
    }
  }

  return (
    <TouchableOpacity
      style={[style, { backgroundColor: bg }]}
      onPress={() => onSelect(index)}
      disabled={selectedRep !== null} // empêche de recliquer après réponse
    >
      <Text style={[styles.repText, { color: txtcolor }]}>{txt}</Text>
    </TouchableOpacity>
  );
}

function Reps({
  txt1 = '',
  txt2 = '',
  txt3 = '',
  txt4 = '',
  onSelect,
  selectedRep,
  correctRep,
}: {
  txt1?: string;
  txt2?: string;
  txt3?: string;
  txt4?: string;
  onSelect: (index: number) => void;
  selectedRep: number | null;
  correctRep: number;
}) {
  return (
    <View style={{ flexDirection: 'column', marginTop: 70 }}>
      <View style={{ flexDirection: 'row' }}>
        <ButtonRep txt={txt1} style={styles.buttonRep} index={1} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
        <ButtonRep txt={txt2} style={styles.buttonRep} index={2} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <ButtonRep txt={txt3} style={styles.buttonRep} index={3} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
        <ButtonRep txt={txt4} style={styles.buttonRep} index={4} onSelect={onSelect} selectedRep={selectedRep} correctRep={correctRep} />
      </View>
    </View>
  );
}

/* Back Button */
// Add this import if you use React Navigation
// import { StackNavigationProp } from '@react-navigation/stack';

// Define NavigationProps type
type NavigationProps = {
  navigation: {
    goBack: () => void;
  };
};

function ButtonBack({ navigation }: NavigationProps) {
  return (
    <TouchableOpacity style={styles.topLeftImage} onPress={() => navigation.goBack()}>
      <Image source={require('./assets/fleche.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
    </TouchableOpacity>
  );
}

export default function ChallengeActivity({ navigation }: NavigationProps) {
  const [selectedRep, setSelectedRep] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState('#fff');

  useEffect(() => {
    if (selectedRep === null) return;
    if (selectedRep === currentQuestion.correctRep) {
      setBgColor('#28a745');
    } else {
      setBgColor('#dc3545');
    }
  }, [selectedRep]);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ButtonBack navigation={navigation} />
      <Question questionText={currentQuestion.questionText} />
      <Reps
        txt1={currentQuestion.rep1}
        txt2={currentQuestion.rep2}
        txt3={currentQuestion.rep3}
        txt4={currentQuestion.rep4}
        onSelect={setSelectedRep}
        selectedRep={selectedRep}
        correctRep={currentQuestion.correctRep}
      />
      <Explaination isAnswered = {selectedRep===null} explaination={currentQuestion.explaination} source={currentQuestion.source} />
      <Comment isAnswered={selectedRep===null} isCorrect={selectedRep === currentQuestion.correctRep && selectedRep !== null} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topLeftImage: { position: 'absolute', top: 30, left: 20 },
  buttonRep: {
    height: 90,
    width: 150,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  repText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Gloucester',
  },
  text: {
    fontSize: 25,
    color: '#070A28',
    textAlign: 'center',
    fontFamily: 'Gloucester',
  },
  subtext: {
    fontSize: 15,
    color: '#070A28',
    textAlign: 'center',
    fontFamily: 'Gloucester',
  },
  question: {
    padding: 20,
    marginTop: 100,
  },
  commentWins: {
    fontSize: 50,
    color: '#FFC900',
    textAlign: 'center',
    fontFamily: 'Gloucester',
    marginTop: 10,
  },
  commentLoses: {
    fontSize: 50,
    color: '#4a4a4a',
    textAlign: 'center',
    fontFamily: 'Gloucester',
    marginTop: 10,
  }
});