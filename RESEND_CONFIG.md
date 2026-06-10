# Configuration Resend - Guide rapide

## ⚠️ Problème probable

L'erreur "Erreur interne du serveur" lors de l'envoi d'email vient probablement de l'utilisation de `onboarding@resend.dev`. 

**Resend ne permet pas d'envoyer à des adresses email réelles avec cet email de test.**

## ✅ Solution

### 1. Accédez à Resend
- Allez sur [resend.com/domains](https://resend.com/domains)
- Connectez-vous avec votre compte

### 2. Configurez un domaine
Vous avez deux options :

#### Option A: Ajouter un domaine personnel (recommandé)
1. Cliquez sur "Add Domain"
2. Entrez votre domaine (ex: `example.com`)
3. Suivez les instructions DNS (généralement 3-4 enregistrements)
4. Vérifiez le domaine

#### Option B: Utiliser un domaine de test Resend (gratuit, plus facile)
1. Resend fournit un domaine de test (ex: `onboarding.resend.dev`)
2. Ce domaine permet d'envoyer à n'importe quelle adresse

### 3. Mettez à jour le code

Remplacez cette ligne dans `src/pages/api/contact.ts` (ligne 53) :
```typescript
from: "Contact Form <onboarding@resend.dev>",
```

Par (utilisez votre domaine) :
```typescript
from: "Contact Form <noreply@example.com>",
// ou avec le domaine de test Resend:
from: "Contact Form <onboarding@resend.dev>",
```

### 4. Redéployez
- Poussez les changements sur GitHub
- Vercel redéploiera automatiquement

## 🔍 Vérifiez les logs

Si le problème persiste, consultez les logs Vercel :
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Allez à **Deployments**
4. Cliquez sur le dernier déploiement
5. Allez à **Functions** et cliquez sur la fonction d'erreur
6. Vous verrez le message d'erreur détaillé de Resend

## Domaines recommandés

- **Pour tester localement** : Utilisez l'email de test Resend
- **Pour la production** : Configurez votre propre domaine (ex: `noreply@votredomaine.com`)
