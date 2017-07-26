#MMM-MotionEye Change Log

## [1.6.0] - 2017-07-26

- Added automatic reload of video in case video source has been temporarely down.
- Fixed documentation about the MotionEye configuration settings when using `autoHide`.
- Simplification/refactoring of the code.

## [1.5.1] - 2017-02-12

- Fixed some bugs for those with multiple cameraes

## [1.5.0] - 2017-02-12

- When `autoHide` is enabled, the camera will be started as hidden.
- If `autoHideDelay` is set to `0` the camera will never be hidden.

## [1.4.0] - 2017-01-29

- Added functionality to hide video stream remotely with a link function ([PR#5](https://github.com/CatoAntonsen/MMM-MotionEye/pull/5) by [snille](https://github.com/snille) )

## [1.3.0] - 2017-01-21

- Close stream when module is hidden (https://github.com/CatoAntonsen/MMM-MotionEye/issues/2)

## [1.2.0] - 2017-01-20

- You can now have multiple instances of this module and use different Web Hook in Motion Eye to just show the video stream from the camera that triggered a motion (https://github.com/CatoAntonsen/MMM-MotionEye/issues/1)

## [1.1.0] - 2017-01-19

- Fixed bug that don't show image if autoHide is FALSE.

## [1.0.0] - 2016-11-29

- Initial version
