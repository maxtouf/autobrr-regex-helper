# Assistant Regex pour Autobrr

Un outil simple mais puissant pour créer et tester des expressions régulières (regex) à utiliser avec [Autobrr](https://autobrr.com).

## Fonctionnalités

- Interface utilisateur intuitive pour créer et tester des regex
- **Nouveau!** Générateur automatique de regex pour séries, films et émissions spécifiques
- Testez immédiatement vos expressions régulières sur plusieurs chaînes de caractères
- Exemples prédéfinis pour les cas d'utilisation courants avec Autobrr
- Section d'aide avec des explications sur les motifs regex courants
- Compatible avec la saveur Golang de regex utilisée par Autobrr

## Utilisation

### Créateur de Regex
1. Entrez votre motif regex dans le champ "Modèle Regex"
2. Ajoutez vos chaînes de test dans la zone de texte (une par ligne)
3. Cliquez sur "Tester Regex" pour voir quelles chaînes correspondent
4. Utilisez les exemples prédéfinis pour des cas d'utilisation courants

### Générateur de Media
1. Allez dans l'onglet "Générateur Media"
2. Entrez le titre de votre série, film ou émission (avec l'année si vous le souhaitez)
3. Sélectionnez le type de média et les options appropriées
4. Cliquez sur "Générer Regex" pour créer une expression adaptée
5. Copiez la regex générée pour l'utiliser dans Autobrr

## Options du Générateur de Media

- **Type de média** : Sélectionnez Films, Séries TV, Documentaires ou Tous
- **Correspondance stricte** : Pour correspondre exactement au titre entré
- **Inclure l'année** : Si vous avez spécifié une année (ex: "Interstellar 2014"), l'inclure dans la regex
- **Inclure qualité** : Ajoute des patterns pour filtrer par qualité (1080p, 720p, etc.)
- **Inclure la saison** : Pour les séries TV, permet de spécifier une saison particulière

## GitHub Pages

Vous pouvez accéder à cette application directement via GitHub Pages:

[https://maxtouf.github.io/autobrr-regex-helper/](https://maxtouf.github.io/autobrr-regex-helper/)

## Pour commencer

Pour utiliser cet outil localement :

1. Clonez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur

Aucune dépendance externe n'est requise, c'est une application HTML/CSS/JS pure.

## Liens utiles

- [Documentation des filtres Autobrr](https://autobrr.com/filters/advanced)
- [Regex101](https://regex101.com) (pour les tests avancés, sélectionnez la saveur Golang)