

# Hardware

follow this tutorial:

http://www.circuitbasics.com/raspberry-pi-ds18b20-temperature-sensor-tutorial/

# Software

Install Motioneye on your Raspberry Pi. Make sure that you also have node and npm installed.

logged in as user pi, clone this repository:

```
git clone git@github.com:renebohne/motioneye-temperature.git
```

add the index.js to your crontab:

```
sudo crontab -e
```

and add a new line at the end:

```
*/2 * * * * /usr/bin/node /home/pi/motioneye-temperature/index.js > /tmp/temp.log
```

The script will run every 2 minutes and update the overlay of your motioneye text.
In your motioneye configuration, you need to activate "custom text" for the bototm_left text.
