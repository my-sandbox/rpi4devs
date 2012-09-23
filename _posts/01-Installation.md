#Installation Headless

>*Qu'allons nous voir ?*

>	- *Comment se connecter au R-Pi*
>	- *Comment configurer le R-Pi*
>	- *2 commandes importantes : reboot et shutdown*

Dans ce qui va suivre, j'ai utilisé la distribution **Raspbian "wheezy"** que vous trouvez donc [ici](http://downloads.raspberrypi.org/images/raspbian/2012-09-18-wheezy-raspbian/2012-09-18-wheezy-raspbian.zip). J'ai monté la distribution sur la SD card avec [Win32DiskImager](https://launchpad.net/win32-image-writer/+download), j'ai donc effectué mes manipulationw sous windows car j'avais un PC sous la main avec un lecteur de carte SD.

Pour faire cette manipulation sous d'autres OS, vous trouverez les instructions ici : [http://elinux.org/RPi_Easy_SD_Card_Setup](http://elinux.org/RPi_Easy_SD_Card_Setup).

Les instructions qui vont suivre ont été faites sous Windows 7 avec Putty pour avoir un terminal SSH. Sachez que sous Linux ou OSX vous pouvez vous en passez, la console suffit. J'ai aussi fait l'installation sous OSX, pour démarrer la connection SSH il suffit de taper dans le terminal : `ssh pi@adresse_ip_du_joujou`. Donc les grands principe de ce qui va suivre sont tout à fait reproductibles avec votre OS préféré (même un ipad avec un client ssh suffirait).

**PS :** l'utilisateur par défaut de la **Raspbian "wheezy"** est `pi`, son mot de passe est `raspberry` (idem pour sudo). Je l'utilise tout le long, et fait fi de toute notion de sécurité, pensez donc à gérer vos droits par la suite.

**PS 2 :** il existe d'autres distributions fonctionnant sur le R-PI, cela fera probablement l'objet d'un chapitre. 


##C'est parti !

Votre distribution est prête. Insérez la SD card dans le R-PI, connectez le joujou à votre box avec un cable réseau et ensuite branchez le sur le secteur (dans cet ordre). Vous devriez avoir des petites lumières qui s'allume, l'important c'est que la led orange s'allume, cela signifie que votre bébé discute avec le réseau.

Ce qu'il faut savoir, c'est que la **Raspbian** au boot démarre un serveur ssh et c'est ça qui va nous permettre de nous connecter à distance sans utiliser de périphérique (clavier, écran, souris). C'est donc pour cela que nous pouvons procéder à une installation **headless** de notre jouet.

###Trouver l'IP du R-PI

Ensuite passez sur votre micro (lui aussi connecté à la box), ouvrez une fenêtre de commande et tapez `ipconfig` ou `ifconfig` selon votre OS, pour obtenir l'ip de votre machine. Par exemple, vous trouvez `192.168.0.14`, maintenant vous devez pinguer les adresses suivantes pour trouver l'adresse affectée au R-Pi par votre box. Le plus souvent c'est la suivante, mais vous n'aurez pas à aller bien loin pour trouver l'ip.

Une fois que vous avez l'adresse vous pouvez enfin vous connecter (avec Putty donc ou un terminal si vous n'êtes pas sous windows) :

###Se connecter

Si tout va bien, il vous sera demandé le nom de l'utilisateur (dans le cas de l'utilisation de Putty ou d'un client SSH, sinon dans le cas du terminal vous spécifiez directement l'utilisateur `pi` dans la commande : `ssh pi@192.168.0.14`) :

**Saisir le nom de l'utilisateur :**

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/001.PNG)

**Saisir le mot de passe de l'utilisateur :**

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/002.PNG)

**Yes !!! Connecté ! :**

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/003.PNG)

##Configuration du R-Pi

###1er contact

Respirez, et tapez votre première commande : `sudo raspi-config` est vous obtenez l'écran suivant :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/004.PNG)

Normalement vous n'avez pas grand chose à faire, si ce n'est sélectionner le choix `expand_rootfs` qui permettra à la distribution **Raspbian** d'utiliser toute la place sur la SD Card.

Vous pouvez ensuite configurer le modèle de clavier (mais normalement en mode headless ce n'est pas nécessaire) :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/005.PNG)

Pour le "layout du clavier", choisir `Other` :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/006.PNG)

Puis choisir `French` pour le pays d'origine

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/007.PNG)

Et enfin le bon "layout" :

Si vous avez un mac : 

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/008.PNG)

Sinon : 

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/009.PNG)

Ensuite, il vous sera demandé le fonctionnement de `AltGr` :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/010.PNG)

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/011.PNG)

Puis de `Control+Alt+Backspace` (je n'ai rien choisi) :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/012.PNG)

Vous validez vos choix, ça va mouliner un petit peu :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/013.PNG)


###Mettre à jour

"Tentez" une mise à jour de votre distribution :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/014.PNG)

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/016.PNG)

Et enfin `<Finish>` :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/017.PNG)

Cela va "mouliner" un peu, puis vous allez revenir à la ligne de commande :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/_posts/imgs/018.PNG)

##A savoir :

###Rebooter le R-Pi :

Tapez la commande : `sudo reboot`

###Arrêter proprement le R-Pi :

Tapez la commande : `sudo shutdown -h now`


Voilà, vous avez un serveur linux prêt à faire plein de choses. Nous pouvons passer à la partie paramétrages.







