"use strict";

export default function getButtonsPressed(evt) {
  var buttons = [];
  if (evt.getModifierState('Control')) buttons.push('Control');
  if (evt.getModifierState('Alt')) buttons.push('Alt');
  if (evt.getModifierState('Shift')) buttons.push('Shift');
  if (evt.getModifierState('Meta')) buttons.push('Meta');
  if (evt.key !== 'Unidentified') {
    buttons.push(evt.key);
  } else if (evt.nativeEvent.keyIdentifier) {
    var keyId = evt.nativeEvent.keyIdentifier;
    if (keyId.substring(0, 2) === 'U+') {
      var code = parseInt(keyId.substring(2), 16);
      buttons.push(String.fromCharCode(code));
    } else {
      buttons.push(keyId);
    }
  }
  return buttons;
}