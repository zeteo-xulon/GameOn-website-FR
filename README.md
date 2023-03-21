# Projet GameOn

Le Projet gameOn est proposé par l'entreprise OpenClassrooms Lien du site si vous n'avez pas Docker sur votre machine : [site GameOn](https://zeteo-xulon.github.io/GameOn-website-FR/#)

## Installation avec Docker

Suivez ce guide pour installer et faire fonctionner l'application avec Docker sur des plateform linux/amd64 ou linux/arm64

## Étape 1 : Télécharger l'image Docker

Pour télécharger l'image Docker depuis le registre, vous devez utiliser la commande `docker pull`. Assurez-vous d'utiliser le nom et le tag corrects de votre image :

``` bash
docker pull zeteoxulon/game-on-website-fr:latest
```

## Étape 2 : Construire l'image pour les architectures spécifiques

Pour construire l'image avec une architecture spécifique, vous pouvez utiliser la commande `docker buildx build` avec l'option `--platform`. Voici comment procéder pour chaque architecture :

### Architecture linux/amd64

``` bash
docker buildx build --platform linux/amd64 -t zeteoxulon/game-on-website-fr:amd64 . --load
```

### Architecture linux/arm64

``` bash
docker buildx build --platform linux/arm64 -t zeteoxulon/game-on-website-fr:arm64 . --load
```

Ces commandes créeront des images pour les architectures spécifiques et les chargeront dans votre environnement Docker local.

## Étape 3 : Faire fonctionner l'image Docker

Pour faire fonctionner l'image Docker avec l'architecture souhaitée, utilisez la commande `docker run`. N'oubliez pas de remplacer le tag de l'image par celui que vous avez utilisé lors de la construction de l'image pour l'architecture spécifique.

### Architecture linux/amd64

``` bash
docker run -p 8080:8080 zeteoxulon/game-on-website-fr:amd64
```

### Architecture linux/arm64

```bash
docker run -p 8080:8080 zeteoxulon/game-on-website-fr:arm64
```

Ces commandes lanceront un conteneur Docker avec l'architecture correspondante et exposeront le port 8080. Vous pourrez ainsi accéder à votre application à l'adresse [http://localhost:8080](http://localhost:8080).

En suivant ces étapes, vous devriez être en mesure de télécharger, construire et faire fonctionner votre image Docker avec les architectures linux/amd64 et linux/arm64.

## Étape préliminaire du projet qui était demandés :

1. Forkez ce repo ;
2. Il est conseillé d'utiliser VisualStudio Code et vous pouvez utiliser Docker, mais ce n'est pas obligatoire ;
3. Il n'y a aucune dépendance ;
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie.
