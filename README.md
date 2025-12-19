# Travel Mate APP

Documentation rédigée en Français dans le cadre académique.

Ceci est le repo de site fullstack du projet Travel Mate pour l'examen developpement Cross-plateforme 25/26 E5

## Get started

Après avoir clonner ce repo, suivez les commandes suivantes pour lancer installer toutes les dépendances des 2 projects (Front & Mobile)

```bash
  $ cd <repo-folder-name>
  $ npm install:all
```

Cette commande installe les différentes dépendances des 2 applications respectives (front & Mobile). en utilisant le fichier `package.json` de chacune d'elle.

## Exécuter en mode test

Pour exécuter ces applications en mode développement vu que nous n'avons pas de gestionnaire de container, on va démarer les 2 applications sur 2 terminal différents

`Dans le Premier terminal pour lancer le backend`

```bash
  npm run back:dev
```

il est configuré pour tourner sur le port 4000 du localhost [http://localhost:4000](http://localhost:4000).

`Dans un second pour lancer le Mobile, vous devez utiliser un second terminal pour garder les process en cours`

```bash
  npm run mobile:start
```

Configuré pour tourner par défaut d'après EXPO sur le port 8081 du localhost [http://localhost:8081](http://localhost:8081).

## Décisions

Utilisation de `prettier` pour formatter de manière uniforme tous les fichiers
Centralisation des services `GET, POST, DELETE, PUT` avec vérification d'authentification nécessaire ou pas avec un base services afin de construire les en-têtes de requêtes de façon standard
Utilisation de `Redux`Pour la gestion des favoris
Utilisation de `React Hook Form` pour la gestion et la validation des formulaires

## Stack Technique

**Client:** React-Native, Expo

**Server:** Node

## Etudiant

- [@Pierre Lewis ABOUTOU TINA](https://www.github.com/LewisTina)

## Documentation

Consigne d'utilisation assez simple.
Pour l'utilisation des fonctionnalités reservées aux membres, la création d'un compte s'effectue en 2 minutes, via un seul formulaire (Aucune restrictions ou exigence)
