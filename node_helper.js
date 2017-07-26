/* Magic Mirror
 * Node Helper: MotionEye
 *
 * By Cato Antonsen (https://github.com/CatoAntonsen)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting module: " + this.name);
	},

	socketNotificationReceived: function(notification, config) {
		if (notification === "CONFIG") {
			if (config.autoHide) {
				var self = this;
				
				console.log("Hiding camera: " + config.id);
				this.sendSocketNotification("MotionEyeHide", config.id);

				this.expressApp.get('/motioneye/hide/:id*?', function (req, res) {
					console.log("Hide registered: " + req.params.id);
					res.send('Hide registered: ' + req.params.id);
					self.sendSocketNotification("MotionEyeHide", req.params.id);
				});
				this.expressApp.get('/motioneye/:id*?', function (req, res) {
					console.log("Motion registered: " + req.params.id);
					res.send('Motion registered: ' + req.params.id);
					self.sendSocketNotification("MotionEyeShow", req.params.id);
				});
			} 

			return;
		}
	},
});