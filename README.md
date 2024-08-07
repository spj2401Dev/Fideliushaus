
# Fideliushaus Website

Dieses Dokumentation beschäftigt sich mit der Backend implementierung und wie man diese anpassen kann.

## Routes

Routes definieren wo eine bestimmte Seite hingeht. Zum Beispiel: 
```http
  GET /:page
```
Die "page" wird durch die routes.json in der Root directory definiert.

```json
{
    "about": "/public/about.html"
}
```
In diesem Fall wird /about, zu der Datei im Order Public weitergeleitet und dort wird dann die Datei about.html zum nuter gesendet. Das gleiche gilt auch für Bilder/Videos/Fonts etc.


## Server Starten

Auf der IP adresse von dem Server befinden sich 4 offene Ports.

| Port | Protkoll    | Nutzen    |
| :---:   | :---: | :---: |
| 21 | SSH   | SSH auf server (z.b mit Terminus)   |
| 22 | SFTP   | Filezilla für Datein   |
| 80 | HTTPS   | Website traffic von HTTPS   |
| 8080 | HTTP   | Website traffic von HTTP - Wird zu port 80 weitergeleitet   |

### SSH

SSH startet in der ROOT default directory. Um in den WebServer Order zu kommen muss man einmal in den richtigen Ordner navigieren. 

```sh
# Navigiert einen Ordern nach oben
cd ..
# Navigiert in den Home Ordern, dann in den Fideliushaus Ordern
cd home
cd fideliushaus
# Starte screen
screen
# Dannach Enter drücken, dannach Webserver starten
node .
# Jetzt STRG-A + D drücken
# Warten auf Bestätigung von beiden Webservern.
```

Wenn der Screen command schon läuft kann man in die Console folgendes eingeben um zum laufenden Webserver zu kommen:

```sh
screen -r
# Jetzt kann man STRG-C drücken um den Webserver zu stopen.
# Um den Server wieder zu starten folgendes:
node .
# Dannach STRG-A + D um wieder zurück zu kommen
```

## FTP

Bei FTP ist zu beachten, dass die veränderung mancher Datein einen Server neustart benötigen. Dazu gehören alle Datein, die nicht im /public folder sind. Alle änderungen in diesem Order sind sofort wirksam. 

Der FTP server defaulted in die Fideliushaus Directory. Um vom SSH dorthin zu kommen werden folgende Befehle benötigt, da der FTP server als eigener Nutzer angelegt ist.

```sh
cd ..
cd home
cd fideliushaus
```

https://xd.adobe.com/view/29986357-8eed-4583-9ba4-9a550b113134-7ccb/screen/78bc18b8-791f-4e50-bfcf-f1e1e6034142/specs/