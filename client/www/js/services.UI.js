define(['app'], function(app)
{
  app.factory('UI', function() {

    return {
      openURL: function(URL){
        window.open(URL, '_system');
      },
      blur: function() {
        var content = document.querySelector('.content');
        var duplicate = content.cloneNode(true);
        var contentBlurred = document.createElement('div');
        contentBlurred.className = 'content-blurred';
        contentBlurred.appendChild(duplicate);

        var header = document.querySelector('header');
        header.appendChild(contentBlurred);

        var contentWrapper = document.querySelector('.content-wrapper'),
        translation;

        contentWrapper.addEventListener('scroll',function(){
          translation = 'translate3d(0,' + (-this.scrollTop + 'px') + ',0)';
          duplicate.style['-webkit-transform'] = translation;
          duplicate.style['-moz-transform'] = translation;
          duplicate.style['transform'] = translation;
          
          console.log(duplicate);
        });
      }

    }

  });
});
