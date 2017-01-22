# MagicMirror² Module: MotionEye
'MMM-MotionEye' is a module for displaying a camera stream from [Motion Eye](https://github.com/ccrisan/motioneye) on your [MagicMirror²](https://magicmirror.builders/)

![Example](example.png) 

Current version is 1.3.0 See [changelog](CHANGELOG.md "Version history") for version history.

## Pre-requisite

You have to have an installation of Motion Eye with Video Streaming enabled. Installation and usage of Motion Eye is out of scope for this documentation.

## Installation

Remote to your MagicMirror²-box with your terminal software and go to your MagicMirror's Module folder:
````bash
cd ~/MagicMirror/modules
````

Clone the repository:
````bash
git clone https://github.com/CatoAntonsen/MMM-MotionEye.git
````

Add the module to the modules array in the `config/config.js` file by adding the following section. Remember to change IP and to YOUR MotionEye :
```
{
	module: 'MMM-MotionEye',
	position: 'bottom_right',
	config: {
		id: 1,
		url: "[See configuration options below]",
		width: "400px",
		autoHide: true,
		autoHideDelay: 60000,
		debug: false
	}
},
```

## Update

To update MMM-MotionEye, go to the MMM-MotionEye folder:
````bash
cd ~/MagicMirror/modules/MMM-MotionEye
````

Pull down the updates:
````bash
git pull
````

Restart Magic Mirror (this asume you uses pm2):
````bash
pm2 restart mm
````

## Configuration options

These are the valid configuration options:

Configuration option | Comment | Default 
---|---|---
id | If you have multiple instances of this module and turned on autoHide, then this value has to match the Web Hook url in Motion Eye. You can use same id on many instances if you want. | N/A
url | Video Streaming URL.<br><br>You find it in <i>Motion Eye</i> in the <i>Video Streaming Section</i> under <i>Usefull URLs</i> by by clicking the <i>Streaming URL</i> link.<br><br>It should look something like this: `http://motioneye:8081` (probably an IP instead of hostname) | No default
autoHide | If you want the camera to only be visible on the mirror when there is motion, set this to true. You will then have to enable "Call a Web Hook" in Motion Eye under the Motion Notifications section: <br><br> - Web Hook URL: <b>[http://URL of your mirror]/motioneye</b>. Example: http://192.168.1.11:8080/motioneye or http://192.168.1.11:8080/motioneye/id if you have multiple instances of this module<br> - HTTP Method: <b>GET</b><br><br>Remember to update IP white list to enable access from your Motion Eye box.|false
autoHideDelay|If autoHide is enabled you can decide how long to wait before hiding the camera|60000 (60 seconds)
width|Width of camera image. You have to try out what fits YOUR monitor | 400px
debug|Show messages in the log|false

## Credits

- [surveillance  picture](http://cdn.makeuseof.com/wp-content/uploads/2015/06/creative-security-camera-intro-670x335.jpg?004f0d) stolen from [makeusof.com](http://www.makeuseof.com/)

Good luck!
