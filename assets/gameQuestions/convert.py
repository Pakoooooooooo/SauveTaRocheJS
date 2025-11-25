import pandas as pd
import json
from typing import List, Dict, Any

class MapChangeData:
    def __init__(self, i: int, j: int, newType: str):
        self.i = i
        self.j = j
        self.newType = newType

    def to_dict(self) -> Dict[str, Any]:
        return {
            "i": self.i,
            "j": self.j,
            "newType": self.newType
        }

class GameRepData:
    def __init__(self, repText: str, price: int, happiness: int,
                 mapChanges: List[MapChangeData], overlayChanges: List[MapChangeData],
                 incomeChanges: int, explConseq: str):
        self.repText = repText
        self.price = price
        self.happiness = happiness
        self.mapChanges = mapChanges
        self.overlayChanges = overlayChanges
        self.incomeChanges = incomeChanges
        self.explConseq = explConseq

    def to_dict(self) -> Dict[str, Any]:
        return {
            "repText": self.repText,
            "price": self.price,
            "happiness": self.happiness,
            "mapChanges": [mc.to_dict() for mc in self.mapChanges],
            "overlayChanges": [oc.to_dict() for oc in self.overlayChanges],
            "incomeChanges": self.incomeChanges,
            "explConseq": self.explConseq
        }

class GameQuestionData:
    def __init__(self, questionText: str, prevQuestCondition: List[Any], prevRepCondition: List[int],
                 prevQuestNotCondition: List[Any], prevRepNotCondition: List[int], caracter: int,
                 rep1: GameRepData, rep2: GameRepData, rep3: GameRepData, rep4: GameRepData):
        self.questionText = questionText
        self.prevQuestCondition = prevQuestCondition
        self.prevRepCondition = prevRepCondition
        self.prevQuestNotCondition = prevQuestNotCondition
        self.prevRepNotCondition = prevRepNotCondition
        self.caracter = caracter
        self.rep1 = rep1
        self.rep2 = rep2
        self.rep3 = rep3
        self.rep4 = rep4

    def to_dict(self) -> Dict[str, Any]:
        return {
            "questionText": self.questionText,
            "prevQuestCondition": self.prevQuestCondition,
            "prevRepCondition": self.prevRepCondition,
            "prevQuestNotCondition": self.prevQuestNotCondition,
            "prevRepNotCondition": self.prevRepNotCondition,
            "caracter": self.caracter,
            "rep1": self.rep1.to_dict(),
            "rep2": self.rep2.to_dict(),
            "rep3": self.rep3.to_dict(),
            "rep4": self.rep4.to_dict()
        }

def parse_map_changes(map_changes_str: str) -> List[MapChangeData]:
    map_changes = []
    if pd.isna(map_changes_str):
        return map_changes
    # Remplacer les $ par des virgules et parser chaque partie
    for change in str(map_changes_str).split(";"):
        change = change.strip()
        if not change:
            continue
        # Remplacer les $ par des virgules pour faciliter le parsing
        parts = change.replace("$", ",").replace("[", "").replace("]", "").split(",")
        if len(parts) >= 3:
            i = int(parts[0])
            j = int(parts[1])
            newType = parts[2].strip('"')
            map_changes.append(MapChangeData(i, j, newType))
    return map_changes

def parse_and_convert_to_json(csv_file_path: str) -> List[Dict[str, Any]]:
    # Lire le fichier CSV en ignorant les deux premières lignes
    df = pd.read_csv(csv_file_path, delimiter=';', encoding='latin1', skiprows=2, header=None)

    # Assigner les noms de colonnes selon votre modèle
    df.columns = [
        "Unused", "Unused", "caracter", "prevQuestCondition", "prevRepCondition",
        "prevQuestNotCondition", "prevRepNotCondition", "questionText", "repText",
        "explConseq", "price", "happiness", "incomeChanges", "mapChanges",
        "overlayChanges", "Unused2", "Unused3", "Unused4", "Unused5", "Unused6",
        "Unused7", "Unused8", "Unused9", "Unused10", "Unused11",
        "Unused12", "Unused13", "Unused14", "Unused15", "Unused16"
    ]

    questions = []

    # Parcourir le DataFrame par groupes de 4 lignes (1 question + 4 réponses)
    for i in range(0, len(df), 4):
        if i + 3 >= len(df):
            break  # S'assurer qu'il y a bien 4 lignes pour chaque question

        question_row = df.iloc[i]

        # Extraire les données de la question
        question_text = question_row["questionText"] if not pd.isna(question_row["questionText"]) else ""

        caracter = int(float(question_row["caracter"])) if not pd.isna(question_row["caracter"]) else 0

        # Extraire prevRepCondition
        prev_rep_condition_str = question_row["prevRepCondition"]
        prev_rep_condition = []
        if isinstance(prev_rep_condition_str, str):
            prev_rep_condition = [int(x) for x in prev_rep_condition_str.split(";") if x.strip()]
        elif not pd.isna(prev_rep_condition_str):
            prev_rep_condition = [int(prev_rep_condition_str)]

        # Extraire les réponses
        reps = []
        for j in range(4):
            rep_row = df.iloc[i + j]
            rep_text = rep_row["repText"] if not pd.isna(rep_row["repText"]) else ""
            expl_conseq = rep_row["explConseq"] if not pd.isna(rep_row["explConseq"]) else ""

            # Convertir les valeurs flottantes en entiers
            price = int(float(rep_row["price"])) if not pd.isna(rep_row["price"]) else 0
            happiness = int(float(rep_row["happiness"])) if not pd.isna(rep_row["happiness"]) else 0
            income_changes = int(float(rep_row["incomeChanges"])) if not pd.isna(rep_row["incomeChanges"]) else 0

            # Parser mapChanges et overlayChanges
            map_changes = parse_map_changes(rep_row["mapChanges"])
            overlay_changes = parse_map_changes(rep_row["overlayChanges"])

            rep_data = GameRepData(
                repText=rep_text,
                price=price,
                happiness=happiness,
                mapChanges=map_changes,
                overlayChanges=overlay_changes,
                incomeChanges=income_changes,
                explConseq=expl_conseq
            )
            reps.append(rep_data)

        # Créer l'objet GameQuestionData
        question_data = GameQuestionData(
            questionText=question_text,
            prevQuestCondition=[],
            prevRepCondition=prev_rep_condition,
            prevQuestNotCondition=[],
            prevRepNotCondition=[],
            caracter=caracter,
            rep1=reps[0],
            rep2=reps[1],
            rep3=reps[2],
            rep4=reps[3]
        )

        questions.append(question_data.to_dict())

    return questions

# Chemin vers votre fichier CSV
csv_file_path = "GameQuestions.csv"

# Convertir le CSV en JSON
questions_json = parse_and_convert_to_json(csv_file_path)

# Sauvegarder le JSON dans un fichier
with open("game_questions_final.json", "w", encoding="utf-8") as f:
    json.dump(questions_json, f, ensure_ascii=False, indent=4)

print("Conversion terminée. Le fichier JSON a été enregistré sous 'game_questions_final.json'.")
