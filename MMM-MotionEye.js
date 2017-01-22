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
		this.motionDetected = false;
		this.timeOutID == undefined;
		
		this.sendSocketNotification('CONFIG', this.config);
	},
	
	// Override dom generator.
	getDom: function() {
		if (this.motionDetected) {
			var img = document.createElement("img");
			img.setAttribute("class", "motionEyeImage");
			img.src = this.config.url;
			img.style.width = this.config.width;
			return img;
		}
		
		return document.createElement("div");
	},
	
	socketNotificationReceived: function(notification, id) {
		this.debug("NOTIFICATION: " + id);
		this.debug("CONFIG: " + this.config.id);

		if (notification === "MotionEyeShow" && (id == null || this.config.id == null) || this.config.id == id){
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
					self.debug("Autohiding ...");
					self.hide(2000, function() {
						self.debug("Removing stream");
						self.motionDetected = false;
						self.updateDom();
					});
				}, self.config.autoHideDelay);
			} else {
				this.debug("AutoHide is not enabled")
			}
		}
	}
});
