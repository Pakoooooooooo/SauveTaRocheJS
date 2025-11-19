#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix.py
Remplace les caractères moisis courants par 'é' dans un ou plusieurs fichiers JSON.

Usage :
  python fix.py chemin/vers/fichier.json   # corrige ce fichier
  python fix.py                            # corrige tous les .json du dossier courant

Le script crée toujours un fichier de sauvegarde <fichier>.bak (sauf si --no-backup).
"""

import argparse
from pathlib import Path
import shutil
import sys

def replace_text_variants(text: str) -> str:
    # remplacements sur chaîne Unicode (après décodage)
    table = {
        '\u009e': 'é',   # contrôle souvent affiché ''
        '\x8e': 'é',
        '\x99': 'é',     # autre contrôle possible selon encodage corrompu
        '\ufeff': '',    # BOM éventuel
        'Ã©': 'é',       # mojibake UTF-8->Latin1
        'Ã¨': 'è',
        'Ãª': 'ê',
        'Ã«': 'ë',
        'Ã´': 'ô',
        'Ã§': 'ç',
        'â': "'",      # autres mojibakes fréquents
        'â': '-',
        'â': '-',
    }
    for k, v in table.items():
        if k in text:
            text = text.replace(k, v)
    return text

def process_file(path: Path, no_backup: bool=False) -> bool:
    """
    Retourne True si des modifications ont été appliquées, False sinon.
    """
    # Lire brut en bytes
    data = path.read_bytes()

    # Tentative 1 : décoder en utf-8
    try:
        text = data.decode('utf-8')
        decoded_with = 'utf-8'
    except Exception:
        # Tentative 2 : latin-1 (1:1 mapping bytes->codepoints)
        text = data.decode('latin-1')
        decoded_with = 'latin-1'

    fixed = replace_text_variants(text)

    # Si aucune modification détectée, faisons un nettoyage binaire ciblé (fallback)
    if fixed == text:
        b = data
        changed = False
        # Remplacements binaires fréquents menant à 'é'
        replacements_bytes = {
            b'\x9e': 'é'.encode('utf-8'),
            b'\x8e': 'é'.encode('utf-8'),
            b'\x99': 'é'.encode('utf-8'),
            b'\xc3\xa9': 'é'.encode('utf-8'),  # UTF-8 bytes already -> ensure proper single-é
        }
        for oldb, newb in replacements_bytes.items():
            if oldb in b:
                b = b.replace(oldb, newb)
                changed = True

        if changed:
            # sauvegarde
            if not no_backup:
                bak = path.with_suffix(path.suffix + '.bak')
                shutil.copy2(path, bak)
            path.write_bytes(b)
            print(f"[BINARY FIX] {path} (decoded with {decoded_with} fallback binary replacements applied)")
            return True

        # dernier essai : réparer des séquences mojibake courantes en latin-1 decoded text
        alt_fixed = text.replace('Ã©', 'é')
        if alt_fixed != text:
            fixed = alt_fixed

    if fixed != text:
        # sauvegarde
        if not no_backup:
            bak = path.with_suffix(path.suffix + '.bak')
            shutil.copy2(path, bak)
            print(f"Backup créé : {bak}")
        # écrire en UTF-8
        path.write_text(fixed, encoding='utf-8')
        print(f"[TEXT FIX] {path} (decoded with {decoded_with})")
        return True

    # Rien à changer
    print(f"[OK] {path} (aucun remplacement nécessaire, décodé en {decoded_with})")
    return False

def main():
    parser = argparse.ArgumentParser(description="Corrige les caractères moisis vers 'é' dans des fichiers JSON.")
    parser.add_argument('input', nargs='?', default=None, help='fichier JSON à corriger (optionnel)')
    parser.add_argument('--no-backup', action='store_true', help="Ne pas créer de sauvegarde .bak")
    args = parser.parse_args()

    if args.input:
        path = Path(args.input)
        if not path.exists():
            print(f"Erreur : fichier introuvable : {path}", file=sys.stderr)
            sys.exit(2)
        process_file(path, no_backup=args.no_backup)
    else:
        # Aucun argument : traiter tous les .json du dossier courant
        cwd = Path.cwd()
        files = list(cwd.glob('*.json'))
        if not files:
            print("Aucun fichier .json trouvé dans le répertoire courant. Placez-vous dans le dossier contenant vos JSON ou donnez un chemin en argument.")
            sys.exit(0)
        for f in files:
            process_file(f, no_backup=args.no_backup)

if __name__ == "__main__":
    main()
