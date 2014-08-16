module.exports = {
  name: 'notify',

  'should display notification in top left': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="top-left"]')
      .assert.visible('body > .notify', 'notify visible')
      .assert.css('.notify', 'top', '5px', 'top positioned correctly')
      .assert.css('.notify', 'left', '5px', 'left positioned correctly')
    .done();
  },

  'should display notification in top middle': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="top-middle"]')
      .assert.css('.notify', 'top', '5px', 'top positioned correctly')
      .assert.css('.notify', 'right', '627px', 'left positioned correctly')
    .done();
  },

  'should display notification in top right': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="top-right"]')
      .assert.css('.notify', 'top', '5px', 'top positioned correctly')
      .assert.css('.notify', 'right', '5px', 'left positioned correctly')
    .done();
  },

  'should display notification in middle left': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="middle-left"]')
      .assert.css('.notify', 'top', '450px', 'top positioned correctly')
      .assert.css('.notify', 'left', '5px', 'left positioned correctly')
      .assert.css('.notify', 'right', 'auto', 'left positioned correctly')
    .done();
  },

  'should display notification in middle middle': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="middle-middle"]')
      .assert.css('.notify', 'top', '450px', 'top positioned correctly')
      .assert.css('.notify', 'right', '627px', 'left positioned correctly')
    .done();
  },

  'should display notification in middle right': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="middle-right"]')
      .assert.css('.notify', 'top', '450px', 'top positioned correctly')
      .assert.css('.notify', 'right', '5px', 'left positioned correctly')
    .done();
  },

  'should display notification in bottom left': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="bottom-left"]')
      .assert.css('.notify', 'top', 'auto', 'top positioned correctly')
      .assert.css('.notify', 'left', '5px', 'left positioned correctly')
      .assert.css('.notify', 'right', 'auto', 'left positioned correctly')
    .done();
  },

  'should display notification in bottom middle': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="bottom-middle"]')
      .assert.css('.notify', 'top', 'auto', 'top positioned correctly')
      .assert.css('.notify', 'right', '627px', 'left positioned correctly')
    .done();
  },

  'should display notification in bottom right': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="bottom-right"]')
      .assert.css('.notify', 'top', 'auto', 'top positioned correctly')
      .assert.css('.notify', 'bottom', '5px', 'left positioned correctly')
      .assert.css('.notify', 'right', '5px', 'left positioned correctly')
    .done();
  },

  'should be able to display multiple notifications at the same time': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="top-left"]')
    .click('[data-ut="middle-middle"]')
    .click('[data-ut="bottom-right"]')
      .assert.numberOfVisibleElements('.notify', '3', '3 notifications visible')
    .done();
  },

  'should auto close notifications': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="middle-middle"]')
    .wait(2000)
      .assert.doesntExist('.notify', 'notification has been removed')
    .done();
  },

  'should not auto close notification': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="no-auto-close"]')
    .wait(2000)
      .assert.visible('.notify', 'notification has not been removed')
    .done();
  },

  'should close through javascript call': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="no-auto-close"]')
    .click('[data-ut="hide"]')
      .assert.doesntExist('.notify', 'notification has been removed')
    .done();
  },

  'should not close on click': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="no-close-on-click"]')
    .click('.notify')
      .assert.visible('.notify', 'notification has not been removed')
    .done();
  },

  'should close on click': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="close-on-click"]')
    .click('.notify')
      .assert.doesntExist('.notify', 'notification has not been removed')
    .done();
  },

  'should append to div with class of page': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="append-to-selector"]')
      .assert.visible('.page > .notify', 'notification in appended to correct element')
    .done();
  },

  'should be positioned absolute': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="position-absolute"]')
      .assert.visible('.notify.absolute', 'notification has absolute css class')
    .done();
  },

  'should have ut class': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="custom-css-class"]')
      .assert.visible('.notify.ut', 'notification has custom css class')
    .done();
  }
}