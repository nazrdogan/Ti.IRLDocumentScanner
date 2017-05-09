var UIScreen = require('UIKit/UIScreen'),
    UIViewController = require('UIKit/UIViewController'),
    UIView = require('UIKit/UIView'),
    UIColor = require('UIKit/UIColor'),
    CGPointMake = require('CoreGraphics').CGPointMake,
    CGRectMake = require('CoreGraphics').CGRectMake,
    NSBundle = require('Foundation/NSBundle'),
    NSURL = require('Foundation/NSURL'),
    NSData = require('Foundation/NSData'),
    AVPlayer = require('AVFoundation/AVPlayer'),
    AVPlayerLayer = require('AVFoundation/AVPlayerLayer'),
    UIColor = require('UIKit/UIColor'),
    NSString = require("Foundation/NSString"),
    UIImage = require('UIKit/UIImage'),
    UIImageView = require('UIKit/UIImageView'),
    IRLDocumentScanner = require('IRLDocumentScanner/IRLDocumentScanner'),
    IRLScannerViewController = require('IRLDocumentScanner/IRLScannerViewController'),

    TiApp = require('Titanium/TiApp');

var scanner;

var IRLScannerViewControllerDelegate = Hyperloop.defineClass('IRLScannerViewControllerDelegate', 'NSObject', ['IRLScannerViewControllerDelegate']);


var bounds = UIScreen.mainScreen.bounds;
var frame = CGRectMake(0, 100, bounds.size.width, bounds.size.height - 200);

var image = UIImageView.alloc().initWithFrame(frame);

IRLScannerViewControllerDelegate.addMethod({
    selector : 'didCancelIRLScannerViewController:',
    instance : true,
    arguments : ['IRLScannerViewController'],
    callback : function(cameraView) {
        if (this.didCancelIRLScannerViewController) {
            this.didCancelIRLScannerViewController(cameraView);
        }
    }
});
IRLScannerViewControllerDelegate.addMethod({
    selector : 'pageSnapped:from:',
    instance : true,
    arguments : ['UIImage', 'IRLScannerViewController'],
    callback : function(page_image, controller) {
        if (this.pageSnapped) {
            this.pageSnapped(page_image, controller);
        }
    }
});

var delegate = new IRLScannerViewControllerDelegate();

delegate.didCancelIRLScannerViewController = function(cameraView) {
    Ti.API.info("cancelled");
    TiApp.app().hideModalController(scanner, true);

};

delegate.pageSnapped = function(page_image, controller) {
    image.setImage(page_image);
    TiApp.app().hideModalController(scanner, true);
};

function doClick() {
    scanner = IRLScannerViewController.standardCameraViewWithDelegate(delegate);
    scanner.showCountrols = true;
    scanner.showAutoFocusWhiteRectangle = true;
    TiApp.app().showModalController(scanner, true);

};
$.index.add(image);
$.index.open();
