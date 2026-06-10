# Guide de déploiement sur Vercel

## Configuration des variables d'environnement

Après avoir poussé votre code sur GitHub, suivez ces étapes :

### 1. **Importer le projet sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre compte GitHub
   - Importez le projet `skept-agency`

### 2. **Ajouter les variables d'environnement**
   Dans les paramètres du projet Vercel :
   - Allez à **Settings** → **Environment Variables**
   - Ajoutez la variable suivante :
     - **Name:** `RESEND_API_KEY`
     - **Value:** `re_WzeAWqrk_4EyRjNcdhqDhRUuGT1fHDq6E`
     - **Environments:** Sélectionnez les environnements où vous en avez besoin (Production, Preview, Development)

### 3. **Configurer le domaine dans l'API**
   Le formulaire de contact utilisera automatiquement votre domaine configuré.
   
   Les emails sont envoyés avec :
   - **Expéditeur** : `noreply@skept.fr`
   - **À destination du contact** : Email de confirmation
   - **À destination admin** : Email de notification à `th@skept.fr`

### 4. **Déployer**
   - Poussez votre code sur GitHub
   - Vercel redéploiera automatiquement

## Notes importantes

- ⚠️ **Ne commitez jamais** le fichier `.env.local` ou la clé API dans GitHub
- ✅ Utilisez `.env.example` pour documenter les variables nécessaires
- 🔒 Les variables d'environnement sont sécurisées et chiffrées par Vercel

## Troubleshooting

**Erreur: "Missing API key"**
- Vérifiez que `RESEND_API_KEY` est bien définie dans les variables d'environnement Vercel
- Assurez-vous qu'elle est accessible dans l'environnement où vous déployez

**Emails non reçus**
- Vérifiez que le domaine Resend est correctement configuré
- Remplacez `onboarding@resend.dev` par votre domaine Resend
