# eSample (pré-tpi)
Moteur de recherche de samples avec un pad permettant de les jouer simultanément et créer rapidement des rythmes.
Développé avec [Vue 3](https://vuejs.org/) et [Vite](https://vitejs.dev/).
## Démarrage de l'app
1. Avoir installé [Node.js](https://nodejs.org/fr)
2. Cloner localement le repository git
```bash
git clone [https://github.com/davidgalindo-git/eSample.git](https://github.com/davidgalindo-git/eSample.git)
```
3. Installer les dépendances
```bash
cd eSample
cd e-sample-app
npm install
```
4. Créer un fichier ".env" au même niveau que "package.json" basé sur le fichier ".env.example" et remplacer les données secrètes.  

(si pas dans /e-sample-app)
```bash
cd e-sample-app
```
Création du fichier
```bash
touch .env
```
5. Lancer le projet  

Dev (développement)
```bash
npm run dev
```
Build (production)
```bash
npm run build
```

## Tests
Aller dans le répertoire e-sample-app
```bash
cd e-sample-app
```
Exécuter les tests du dossier src/tests avec Vitest UI
```bash
npx vitest --ui
```

## Téléchargement de samples
Pour télécharger des samples de Freesound, 
il faut utiliser un token d'authentification généré après avoir login

### 1. Création d'un compte Freesound
   - Aller sur [Freesound](https://freesound.org/)
   - Cliquer le bouton "Log in"
   - Cliquer sur "Don't have an account? Join now"
   - Créer un nouveau compte
   - Cliquer sur le lien de vérification envoyé par email
   - Log In
### 2. Enregistrement de l'App
   - Aller sur [Freesound - My Apps](https://freesound.org/apiv2/apply/)
   - Saisir le nom de l'application (ex. e-sample)
   - Saisir l'url de l'application: [(ex. https://localhost:5173)](https://localhost:5173)
   - Saisir le callback URL: [(ex. https://localhost:5173)](https://localhost:5173)
   - Saisir une description: (ex. I'm a student using Freesound as an api to test sample research and download.)
   - Récupérer le Client ID et le Client Secret (à mettre dans le fichier .env)
### 3. Demande d'autorisation
   - Cliquer le bouton "Connect to Freesound" dans eSample.
   - Cliquer le bouton "Authorize!" pour autoriser l'application à accéder au compte.
### 4. Récupération du "Code" et échange contre le "Token"
   - Réception automatique d'un "acess_token" temporaire suite au retour sur la page de l'app.
   - Validation: Le bouton "Connect to Freesound" devient un bouton "Logout"
### 5. Utilisation du Token pour le téléchargement:
   - Rechercher un sample (ex. piano)
   - Cliquer sur le bouton de téléchargement d'un sample (ex. Piano in 11_8 433.wav)
   - Le sample est téléchargé en utilisant le token d'authentification récupéré.