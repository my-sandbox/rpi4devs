#Paramétrages & Utilitaires

>*Qu'allons nous voir ?*

>	- *S'envoyer l'IP par mail au démarrage*
>	- *Samba*
>	- *VNC*
>	- *Utilitaires*

Quelques paramétrages indispensables pour bien vivre avec son R-Pi.

**Pour toutes les manipulations qui vont suivre, souvenez vous que nous sommes toujours dans le terminal ssh.**

##Récupérer facilement l'adresse ip du R-Pi

Plutôt que de "pinguer" toutes les adresses ip de la maison pour retrouver son serveur "mobile", nous allons créer un script python qui au démarrage du R-Pi, nous enverra par mail l'ip de la bête. Je n'ai rien inventé, c'est tiré d'ici [http://elinux.org/RPi_Email_IP_On_Boot_Debian](http://elinux.org/RPi_Email_IP_On_Boot_Debian).

Tout d'abord, il faut créer un script `startup_mailer.py` (j'ai sauvagement fait ça à la racine) : `pico startup_mailer.py` avec le code suivant :

	import subprocess
	import smtplib
	import socket
	from email.mime.text import MIMEText
	import datetime
	# Change to your own account information
	to = 'me@example.com'
	gmail_user = 'test@gmail.com'
	gmail_password = 'yourpassword'
	smtpserver = smtplib.SMTP('smtp.gmail.com', 587)
	smtpserver.ehlo()
	smtpserver.starttls()
	smtpserver.ehlo
	smtpserver.login(gmail_user, gmail_password)
	today = datetime.date.today()
	# Very Linux Specific
	arg='ip route list'
	p=subprocess.Popen(arg,shell=True,stdout=subprocess.PIPE)
	data = p.communicate()
	split_data = data[0].split()
	ipaddr = split_data[split_data.index('src')+1]
	my_ip = 'Your ip is %s' %  ipaddr
	msg = MIMEText(my_ip)
	msg['Subject'] = 'IP For RaspberryPi on %s' % today.strftime('%b %d %Y')
	msg['From'] = gmail_user
	msg['To'] = to
	smtpserver.sendmail(gmail_user, [to], msg.as_string())
	smtpserver.quit()

ou vous allez personnaliser avec vos propres informations les lignes suivantes :

	# Change to your own account information
	to = 'me@example.com'
	gmail_user = 'test@gmail.com'
	gmail_password = 'yourpassword'
	smtpserver = smtplib.SMTP('smtp.gmail.com', 587)

ensuite vous sauvegardez, et rendez le script exécutable : `sudo chmod +x startup_mailer.py`. Ensuite nous allons expliquer au système qu'il faut exécuter le script au démarrage. Vous êtes sous une distribution "Raspian", donc tapez : `sudo pico /etc/rc.local` et modifiez la fin du script comme ceci :


	# Print the IP address
	_IP=$(hostname -I) || true
	if [ "$_IP" ]; then
	  printf "My IP address is %s\n" "$_IP"
	  #Script to email ip address upon reboot
	  python /home/pi/startup_mailer.py
	fi

	exit 0

Sauvegardez. Faites un `sudo reboot` pour tester.

##Partage de fichiers samba

Faire du partage de fichiers entre le R-Pi et votre micro via l'explorateur windows, ou le finder d'OSX ou Nautilus sous Gnome, etc. ... à travers le voisinage réseau peut être très pratique.

Pour cela il faut transformer le R-Pi en serveur Samba.

- Vous avez besoin d'installer les programmes nécessaires en tapant la commande suivantes : `sudo apt-get install samba samba-common-bin`.
- Ensuite, il faudra éditer le fichier de configuration : `sudo pico /etc/samba/smb.conf`
- Chercher la rubrique `####### Authentication #######` et créez l'entrée suivante (ou décommentez si elle existe) : `security = user`

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/02-001-samba.png)

- puis chercher la rubrique `[homes]` et précisez : `comment = Home Directories`, `browseable = yes`, `read only = no` :   

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/02-002-samba.png)

- Sauvegardez et quittez (l'éditeur)
- Associez un mot de passe samba à l'utilisateur `pi` : `sudo smbpasswd -a pi` (perso j'utilise `raspberry`)
- Re-démarrez le serveur samba : `sudo /etc/init.d/samba restart`

Et voilà, il ne vous reste plus qu'à tester, par exemple sous OSX, vous allez dans le menu `Go` du Finder, sélectionnez `Connect to server ...`, saisissez `smb://adresse_ip_du_raspberry` et connectez vous en tant que `pi` avec le mot de passe associé et enfin vous choisissez le volume à monter.

**Remarque :** *Normalement, le raspberry-pi devrait apparaître dans le voisinage réseau*

##Prise de contrôle VNC

Pour d'autres raisons, vous souhaitez faire de la prise de contrôle vnc du R-Pi, c'est très simple, pour cela nous allons utiliser tightvncserver.

- Installation : `sudo apt-get install tightvncserver`
- Ensuite lancer la commande : `tightvncserver :1` (vous pouvez lancer plusieurs sessions : `tightvncserver :2`, `tightvncserver :3`, etc. ...).
- Un mot de passe pour la session vnc vous est demandé (au hasard j'utilise `raspberry`)
- Vous pouvez maintenant vous connecter avec votre client vnc préféré.
- **N'achetez rien pour OSX, ça existe en standard**, sélectionnez `Connect to server ...` dans le menu `Go` du Finder, puis `vnc://adresse_ip_du_raspberry:5901`

##Utilitaires

###Midnight Commander

Si vous n'êtes pas à l'aise avec la ligne de commande, il existe un utilitaire pratique : **Midnight Commander** ou **mc**. Pour l'installer : `sudo apt-get install mc`, puis pour le lancer `mc` :

![Alt "img"](https://github.com/k33g/rpi4devs/raw/master/imgs/02-003-mc.png)

Et maintenant à vous la balade dans le file system avec les touches fléchées !
