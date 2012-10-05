#Javascript

>*Qu'allons nous voir ?*

>	- *Installer Nodejs & npm*
>	- *Compiler NodeJS*
>	- *Coffeescript, express, Yeoman*
>	- *...*

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/03-000-Javascript.jpeg)

##Installer NodeJS & npm

Alors ce n'est pas dur du tout, un `sudo apt-get install nodejs npm` doit suffire, mais vous vous retrouvez avec une version `0.6.x` qui est insuffisante pour installer certains outils (comme **Yeoman** par exemple).

Du coup, il faut compiler Nodejs pour avoir une version supérieure ! Le lien qui fonctionne pour avoir la `v0.8.9`, c'est par ici (testé pour vous) : [https://github.com/nneves/Raspberrypi_NodeJS/blob/master/Compile_RaspberryPi_NodeV0.8.x.md#compile-nodejs-v08x-on-a-raspberrypi-with-linux-debian-armel-wheezy](https://github.com/nneves/Raspberrypi_NodeJS/blob/master/Compile_RaspberryPi_NodeV0.8.x.md#compile-nodejs-v08x-on-a-raspberrypi-with-linux-debian-armel-wheezy). Il faut juste être patient.

Alors il semblerait qu'à partir de la `v0.8.11`, cela soit plus facile à compiler : [http://www.raspberrypi.org/phpBB3/viewtopic.php?f=34&t=18775](http://www.raspberrypi.org/phpBB3/viewtopic.php?f=34&t=18775). Mais je n'ai pas encore testé cette solution.

##Ensuite, quoi installer ?

Très très simple ...

###Coffeescript

	sudo npm install -g coffee-script

###Express.js

	sudo npm install -g express

A partir de maintenant vous avez un serveur de dév Javascript/Node "surpuissant" ;), il restera la partie base de données, mais c'est un autre chapitre.

###Pour voir : Eh oui, Yeoman fonctionne sur un Raspberry-Pi !

Je ne vous engage à aller voir le site sur la partie "installation manuelle" [https://github.com/yeoman/yeoman/wiki/Manual-Install](https://github.com/yeoman/yeoman/wiki/Manual-Install), le seul truc à savoir, ce n'est pas la peine de tenter l'installation ou la compilation de PhamtomJS, il n'y a pas de version ARM, mais tous le reste fonctionne.

