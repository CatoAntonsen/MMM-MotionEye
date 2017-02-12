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
		width: "400px",
		autoHide: false,
		autoHideDelay: 60000,
		debug: false
	},

	debug: function(msg) {
		if (this.config.debug) {
			console.log("MMM-MotionEye: " + msg)
		}
	},
	
	start: function() {
		this.motionDetected = !this.config.autoHide;
		this.timeOutID == undefined;
		
		this.sendSocketNotification('CONFIG', this.config);
	},
	
	// Override dom generator.
	getDom: function() {
		if (this.motionDetected) {
			var img = document.createElement("img");
			img.setAttribute("class", "motionEyeImage");
			img.id = this.config.id;
			img.src = this.config.url;
			img.style.width = this.config.width;
			return img;
		}
		
		return document.createElement("div");
	},
	
	socketNotificationReceived: function(notification, id) {
		this.debug("socketNotificationReceived notification: " + notification);
		this.debug("socketNotificationReceived notification id: " + id);
		this.debug("socketNotificationReceived notification config.id: " + this.config.id);

		if (notification === "MotionEyeShow" && this.config.id == id) {
			this.debug("socketNotificationReceived notification is MotionEyeShow");
			this.motionDetected = true;
			this.updateDom();
			
			if (this.timeOutID != undefined) {
				clearTimeout(this.timeOutID);
				this.timeOutID = undefined;
			}

			this.debug("Showing module")
			this.show(2000);

			if (this.config.autoHide && this.config.autoHideDelay > 0) {
				this.debug("Module will autohide in " + this.config.autoHideDelay + " ms")
				var self = this;
				this.timeOutID = setTimeout(function() {
					self.debug("Autohiding ...");
					self.hide(2000, function() {
						self.debug("Removing stream");
						self.motionDetected = false;
						self.updateDom();
					});
				}, self.config.autoHideDelay);
			} else {
				this.debug("AutoHide is not enabled or autoHideDelay is 0")
				this.motionDetected = true;
				this.updateDom();
			}
		} else if (notification == "MotionEyeHide" && this.config.id == id) {
			this.debug("socketNotificationReceived notification is MotionEyeHide");
			var self = this;
			this.hide(2000, function() {
				self.debug("Removing stream");
				self.motionDetected = false;
				self.updateDom();
			});
		}
	}
});
