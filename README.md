# ParkOps - Système de Gestion de Parc d'Attractions

ParkOps est un système complet de gestion de parc d'attractions en temps réel, développé avec Electron.js et Node.js. Cette application permet de contrôler toutes les opérations d'un parc d'attractions moderne, des attractions aux caméras de sécurité, en passant par la gestion des tickets et du personnel.

## Fonctionnalités Principales
### Contrôle des Attractions
- Surveillance en temps réel des attractions
- Gestion des états (ouvert, maintenance, incident)
- Suivi du temps d'attente et de la capacité
- Journal de maintenance

### Caméras de Sécurité
- Connexion aux caméras via adresse IP
- Visualisation des flux en direct
- Contrôles vidéo (plein écran, capture, actualisation)

### Gestion des Tickets
- Suivi des tickets vendus
- Statistiques de fréquentation
- Analyse des ventes en temps réel

### Gestion du Personnel
- Planning des équipes
- Suivi des présences
- Attribution des rôles

### Panneau d'Urgence
- Actions rapides (alarme, arrêt d'urgence, évacuation)
- Boutons de secours médical et incendie
- Réinitialisation et paramètres d'usine

### Paramètres Avancés
- Configuration du réseau
- Préférences d'interface
- Sauvegarde et restauration
- Mises à jour automatiques

### Technologies Utilisées
- Frontend: Electron.js, HTML5, CSS3, JavaScript ES6+
- Backend: Node.js
- Base de Données: SQLite (intégrée)
- Communication: Socket.IO (temps réel)
- Packaging: Electron Builder
- Tests: Jest

## Installation et Lancement
### Prérequis
- Node.js v18+
- npm v9+
- Git

## Étapes d'installation
1. Clonez le dépôt :
*git clone https://github.com/parkops-dev/ParkOps.git*
*cd ParkOps*

2. Installez les dépendances :
*npm install*

3. Lancez l'application en mode développement :
*npm start*

## Construction des exécutables
Pour créer des packages d'installation :

**Pour Windows**
*npm run build:win*

**Pour macOS**
*npm run build:mac*

**Pour Linux**
*npm run build:linux*

**Pour toutes les plateformes**
*npm run build*

*Les exécutables seront générés dans le dossier dist/.*

## Architecture du Projet
*parkops/
├── build/          # Icônes et ressources de construction
├── src/            # Code source principal
│   ├── main/       # Processus principal Electron
│   │   ├── main.js
│   │   └── ipcHandlers.js
│   ├── renderer/   # Processus de rendu
│   │   ├── assets/
│   │   ├── js/
│   │   │   ├── renderer.js
│   │   │   ├── dashboard.js
│   │   │   └── ...
│   │   ├── css/
│   │   └── index.html
│   └── preload/    # Scripts de préchargement
├── database/       # Base de données SQLite
├── tests/          # Tests unitaires et d'intégration
├── package.json
└── README.md*

## Fonctionnalités Avancées
- Mises à jour Automatiques
- Vérification automatique des nouvelles versions
- Téléchargement et installation en arrière-plan
- Journalisation des changements
- Système de Sécurité
- Authentification à deux facteurs
- Délai d'inactivité configurable
- Chiffrement des données sensibles
- Console de Débogage
- Journalisation détaillée des événements
- Outils de diagnostic intégrés
- Export des logs
- Sauvegarde et Restauration
- Sauvegardes automatiques quotidiennes
- Restauration à partir de points de sauvegarde
- Export/import des données

## Contribution
Les contributions sont les bienvenues ! Voici comment participer :
- Forkez le projet
- Créez une branche pour votre fonctionnalité (git checkout -b feature/ma-fonctionnalite)
- Committez vos changements (git commit -am 'Ajout d'une super fonctionnalité')
- Pushez vers la branche (git push origin feature/ma-fonctionnalite)
- Ouvrez une Pull Request

## Normes de Code
- Respecter le style ESLint configuré
- Écrire des tests Jest pour les nouvelles fonctionnalités
- Documenter le code avec des commentaires JSDoc

## Auteurs
**Maxlware** - Fondateur

## Licence
Ce projet est sous licence **ISC** - voir le fichier LICENSE pour plus de détails.

## Support
Pour tout problème ou question, veuillez ouvrir un issue sur GitHub.

*ParkOps - Votre solution tout-en-un pour la gestion moderne de parcs d'attractions
© 2023 ParkOps-Dev & Maxlware*
