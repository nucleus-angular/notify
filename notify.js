/**
 * todo:
 * test all position for absolute within element
 */
angular.module('nag.notify', [])
.factory('nagNotify', [
  'nagHelper',
  'nagBeat',
  function(nagHelper, nagBeat) {
    return {
      notify: function(options) {
        var self = this;
        var id, classes, $appendTo, $notifyDom, width, height, containerWidth, containerHeight;
        id = nagHelper.generateId('nag-notify');
        classes = 'nag-notify';

        options = angular.extend({
          content: null,
          closeOnClick: true,
          autoCloseDelay: 2000,
          appendSelector: 'body',
          //cssPosition absolute useful for showing notify within a relative element and fixed is generally for page wide notifications
          cssPosition: 'fixed',
          margin: 5,
          horizontalPosition: 'middle', //left, middle, right
          verticalPosition: 'top', //top, middle, bottom,
          cssClass: '' //allows you to append one or more css class to the main wrapper
        }, options);

        $appendTo = $(options.appendSelector);

        if(options.cssPosition == 'absolute') {
          classes += ' absolute';
        }

        if(options.cssClass.length > 0) {
          classes += ' ' + options.cssClass;
        }

        $notifyDom = $('<div id="' + id + '" class="' + classes + '">' + options.content + '</div>');
        $appendTo.append($notifyDom);

        width = $('#' + id).outerWidth();
        containerWidth = (options.cssPosition == 'fixed' ? $(window).width() : $('#' + id).parent().width());

        height = $('#' + id).outerHeight();
        containerHeight = (options.cssPosition == 'fixed' ? $(window).height() : $('#' + id).parent().height());

        switch(options.verticalPosition) {
          case 'middle':
            $('#' + id).css('margin-top', parseInt((containerHeight / 2) - (height / 2)));
            break;

          case 'bottom':
            $('#' + id).css('margin-top', containerHeight - (options.margin + height));
            break

          default: //top
            $('#' + id).css('margin-top', options.margin);
            break;
        }

        switch(options.horizontalPosition) {
          case 'left':
            $('#' + id).css('margin-left', options.margin);
            break;

          case 'right':
            $('#' + id).css('margin-left', containerWidth - (options.margin + width));
            break

          default: //middle
            $('#' + id).css('margin-left', parseInt((containerWidth / 2) - (width / 2)));
            break;
        }

        if(_(options.autoCloseDelay).isNumber()){
          nagBeat.add(id + ' close beat', function() {
            self.remove(id);
          }, options.autoCloseDelay, {
            once: true
          });
        }

        if(options.closeOnClick){
          $('#' + id).on('click', function()
          {
            self.remove(id);
          });
        }

        return id;
      },

      remove: function(id){
        nagBeat.remove(id + ' close beat');
        $('#' + id).remove();
      }
    }
}]);
