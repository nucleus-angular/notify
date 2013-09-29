/**
 * Notification window system
 *
 * @module nag.notify
 * @ngservice nagNotify
 *
 * @todo: test all position for absolute within element
 */
angular.module('nag.notify', [])
.factory('nagNotify', [
  'nagHelper',
  'nagBeat',
  function(nagHelper, nagBeat) {
    return {
      /**
       * Creates a notification on the page
       *
       * @method notify
       *
       * @param {object} options Options for the notification
       *   @param {string} [options.content=null] The content for the notification
       *   @param {boolean} [options.closeOnClick=true] Whether or not th notification will close when clicked on
       *   @param {number|boolean} options.autoCloseDelay=2000] How long till the notification will automatically be closed in milliseconds (false to not
       *   have it auto close)
       *   @param {string} [options.appendSelector="body"] CSS selector for where the notification should be appended to
       *   @param {string} [options.cssPosition="fixed"] CSS positioning for the notification
       *   @param {margin} [options.margin=5] Margin for the notification
       *   @param {string} [options.horizontalPosition="middle"] Position horizontally for the notifications
       *   @param {string} [options.verticalPosition="top"] Position vertically for the notifications
       *   @param {string} [options.cssClass=""] String with additional classes to add in
       * @returns {string} The id of the notification
       */
      notify: function(options) {
        var self = this;
        var id, classes, $appendTo, $notifyDom, width, height, containerWidth, containerHeight;
        id = nagHelper.generateId('notify');
        classes = 'notify';

        //default options for a notify window
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

      /**
       * Removes the notifications
       *
       * @method remove
       *
       * @param {string} id The id of the notification
       */
      remove: function(id){
        nagBeat.remove(id + ' close beat');
        $('#' + id).remove();
      }
    }
}]);
