/**
 * # Notify
 *
 * The notify service allows you to be able to add overlayless modal messages that can information the user about anything.  It appends HTML to the DOM witht he content you want to display to the user which generally will be removed after a specified peroid of time or the user interact with the modal (like clicking on it).
 *
 * To create a notify, all you have to do is this:
 *
 * ```javascript
 * nagNotify.notify({
 *   content: '<div>Whatever HTML you want to put into here</div>'
 * });
 *
 * There is a number of options you can pass to it, just look at the documentation for the notify method.
 *
 * @todo: need to move the config defaults into the nagDefault service
 * @todo: test all position for absolute within element
 *
 * @module nag.notify
 * @ngservice nagNotify
 */
angular.module('nag.notify')
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
       *   @param {string} content The content for the notification
       *   @param {boolean} [closeOnClick=true] Whether or not th notification will close when clicked on
       *   @param {number|boolean} [closeOnDelay=2000] How long till the notification will automatically be closed in milliseconds (false to not
       *   have it auto close)
       *   @param {string} [appendSelector="body"] CSS selector for where the notification should be appended to
       *   @param {string} [cssPosition="fixed"] CSS positioning for the notification
       *   @param {margin} [margin=5] Margin for the notification
       *   @param {string} [horizontalPosition="middle"] Position horizontally for the notifications
       *   @param {string} [verticalPosition="top"] Position vertically for the notifications
       *   @param {string} [cssClass=""] String with additional classes to add in
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
          closeOnDelay: 2000,
          appendSelector: 'body',
          //cssPosition absolute useful for showing notify within a relative element and fixed is generally for page wide notifications
          cssPosition: 'fixed',
          margin: 5,
          horizontalPosition: 'right', //left, middle, right
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
            $('#' + id).css('top', parseInt((containerHeight / 2) - (height / 2)));
            break;

          case 'bottom':
            $('#' + id).css({
              'bottom': options.margin,
              'top': 'auto'
            });
            break;

          case 'top':
            $('#' + id).css('top', options.margin);
            break;

          default: //top
            break;
        }

        switch(options.horizontalPosition) {
          case 'left':
            $('#' + id).css({
              'left': options.margin,
              'right': 'auto'
            });
            break;

          case 'right':
            $('#' + id).css('right', options.margin);
            break;

          case 'middle':
            $('#' + id).css('right', parseInt((containerWidth / 2) - (width / 2)));
            break;

          default: //middle
            break;
        }

        if(_(options.closeOnDelay).isNumber()){
          nagBeat.add(id + ' close beat', function() {
            self.remove(id);
          }, options.closeOnDelay, {
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
