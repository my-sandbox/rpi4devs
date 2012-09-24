#Java

>*Qu'allons nous voir ?*

>	- *Installer OpenJDK 7*
>	- *Installer Vert.x*
>	- *Installer Groovy*
>	- *Ce que je ne suis pas arrivé à faire*
>	- *... à compléter ...*

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-000-Java.jpeg)

Bon, le R-Pi n'est pas une bête de course, Java n'est peut-être pas la technologie la plus légère du monde, mais elle arrive à trouver sa place sur le R-Pi (heureusement).

**Pour toutes les manipulations qui vont suivre, souvenez vous que nous sommes toujours dans le terminal ssh.**

##OpenJDK 7

Ceux qui me suivent ont peut-être compris que je n'utilisais maintenant que la version open-source du JDK sur OSX (c'est à cause (grâce à) de Monsieur [@hgomez](https://twitter.com/hgomez) et [http://code.google.com/p/openjdk-osx-build/](http://code.google.com/p/openjdk-osx-build/)), donc je vais faire pareil pour le R-Pi.

Sachez donc qu'il existe un portage de l'OpenJDK (6 & 7) pour l'architecture ARM [http://openjdk.java.net/projects/zero/](http://openjdk.java.net/projects/zero/).

Et comment on fait pour l'installer ? Rien de plus simple : `sudo apt-get install openjdk-7-jdk`.

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-001-Java.png)

##Installation de Vert.x

L'objectif n'est pas de faire un tuto sur Vert.x maid de montrer les principes d'installation en mode commande, téléchargement, édition du fichier de configuration, etc. ...

###Qu'est ce que Vert.x ?

Rapidement, c'est un framework pour développer des applications web (un peu dans le même esprit que NodeJS). Vous pouvez l'utilisez avec Java, Javascript (avec Rhino), Ruby (JRuby), **Groovy**, Python (Jython) et c'est ici : [http://vertx.io/](http://vertx.io/).

###Installation :

- Téléchargez Vert.x : `wget http://vertx.io/downloads/vert.x-1.2.3.final.tar.gz`
- "Dé-Tarer" Vert.x : `tar zxf vert.x-1.2.3.final.tar.gz` (cela va créer un répertoire `vert.x-1.2.3.final`)

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-002-Java.png)

###Modifier les variables d'environnement

Il faut ouvrir le fichier `.profile` : `sudo pico ~/.profile` et y ajouter ceci (j'ai mis ça à la fin du fichier) :

	export VERTX_HOME=/home/pi/vert.x-1.2.3.final
	export PATH=$VERTX_HOME/bin:$PATH

Enfin, sauvegardez. Si vous ouvrez une autre session ssh et que vous tapez `vertx version` vous devriez obtenir ceci : `vert.x-1.2.3.final `.

##Groovy

###Installation :

Vous aurez probablement besoin de `unzip`, donc pour l'installer `sudo apt-get install unzip`, puis :

- Télécharger Groovy : `wget http://dist.groovy.codehaus.org/distributions/groovy-binary-2.0.4.zip`
- Dézipper : `unzip groovy-binary-2.0.4.zip` (vous allez donc obtenir un répertoire `groovy-2.0.4`)

###Modifier les variables d'environnement

Il faut à nouveau ouvrir le fichier `.profile` : `sudo pico ~/.profile` 

	export GROOVY_HOME=/home/pi/groovy-2.0.4
	export PATH=$PATH:$GROOVY_HOME/bin

Enfin, sauvegardez. Si vous ouvrez une autre session ssh et que vous tapez `groovysh` (c'est un peu long), vous otiendrez quelque chose comme ceci :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-003-Java.png)

##Play!► 1

Alors, la compilation est un peu lente, mais Play!► 1 fonctionne sur le R-Pi (je suis à 2 doigts de revenir en arrière ... par rapport à Play!► 2).

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-005-Java.jpeg)

###Installation :

- Téléchargez play : `wget http://download.playframework.org/releases/play-1.2.5.zip`
- dé-zippez : `unzip play-1.2.5.zip`
- éditez le fichier de configuration : `sudo pico ~/.profile` :

Ajoutez la variable d'environnement :

	export PLAY_HOME=/home/pi/play-1.2.5
	export PATH=$PATH:$PLAY_HOME

Sauvegarder, ouvrez une autre session et tapez `play` pour vérification.

###Testez rapidement :

Commencez par créer une nouvelle application : `play demo`.

####Création d'un modèle

Créer un modèle `/demo/app/models/Version.java` :

	package models;

	public class Version {

	        public String reference;
	        public String name;

	        public Version() {
	                this.reference = "v° zero";
	                this.name = "proto pour les potos";
	        }

	}

####Modification du contrôleur Application

Modifiez le code du contrôleur `/demo/app/controllers/Application.java` :

	package controllers;

	import play.*;
	import play.mvc.*;

	import java.util.*;

	import models.*;

	public class Application extends Controller {

	    public static void index() {
	        Version version = new Version();
	        render(version);
	    }

	}

####Modification de la vue principale

Modifiez la vue `/demo/app/views/Application/index.html` :

	#{extends 'main.html' /}
	#{set title:'K33G_ORG' /}

	<hr>
	<b>Version : ${version.reference} ${version.name}</b>
	<hr>

####Lancez :

- `cd demo`
- `play run`
- Ouvrez un navigateur sur votre micro et appelez `http://ip_du_raspbery:9000`
- Attendre, attendre, attendre et ...

 ... Magique :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/04-004-Java.png)


##Ce que je ne suis pas arrivé à faire :

- faire "tourner" Playframework 2
- ...

##A tester :

- ???

##A venir :

- codes d'exemples pour tester Vert.x









