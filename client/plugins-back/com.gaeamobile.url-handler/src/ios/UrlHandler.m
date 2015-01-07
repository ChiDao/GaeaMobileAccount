#import "UrlHandler.h"
@implementation UrlHandler

- (void)pluginInitialize
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationLaunchedWithUrl:) name:CDVPluginHandleOpenURLNotification object:nil];    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationFinishedLaunching:) name:CDVPageDidLoadNotification object:nil];
}

- (void)applicationLaunchedWithUrl:(NSNotification*)notification
{
    NSURL *url = [notification object];
    self.url = url;
}

- (void)applicationFinishedLaunching:(NSNotification*)notification
{
    if (self.url != nil) {
        NSString* jsString = [NSString stringWithFormat:@"if (typeof handleOpenURL === 'function') { handleOpenURL(\"%@\");}", self.url];
        [self.webView stringByEvaluatingJavaScriptFromString:jsString];
    }
}
@end
