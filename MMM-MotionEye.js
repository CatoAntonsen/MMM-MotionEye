/* global Module */

/* Magic Mirror
 * Module: MMM-MotionEye
 *
 * By Cato Antonsen
 * MIT Licensed.
 */

Module.register("MMM-MotionEye",{

	// Default module config.
	defaults: {
		url: "http://192.168.1.115:8081",
		width: "60px",
		autoHide: false,
		autoHideDelay: 60000,
		debug: true
	},

	debug: function(msg) {
		if (this.config.debug) {
			console.log("MMM-MotionEye: " + msg)
		}
	},
	
	start: function() {
		this.motionDetected = false;
		this.timeOutID == undefined;
		
		this.sendSocketNotification('CONFIG', this.config);
	},
	
	// Override dom generator.
	getDom: function() {
		if (this.motionDetected) {
			var img = document.createElement("img");
			img.setAttribute("ID", "motionEyeImage");
			img.src = this.config.url;
			img.style.width = this.config.width;
			return img;
		}
		
		return document.createElement("div");
	},
	
	socketNotificationReceived: function(notification, payload) {
		console.log("NOTIFICATION");

		if (notification === "MotionEyeShow"){
			this.motionDetected = true;
			this.updateDom();
			
			if (this.timeOutID != undefined) {
				clearTimeout(this.timeOutID);
				this.timeOutID = undefined;
			}
			
			this.debug("Showing module")
			this.show(2000);
			
			if (this.config.autoHide) {
				this.debug("Module will autohide in " + this.config.autoHideDelay + " ms")
				var self = this;
				self.timeOutID = setTimeout(function() {
					self.debug("Autohiding ...")
					self.hide(2000);
				}, self.config.autoHideDelay);
			} else {
				this.debug("AutoHide is not enabled")
			}
		}
		
		if (notification === "MotionEyeHide" && this.config.autoHide){
			this.debug("Hiding module")
			this.hide(2000);
		}
	}
});
