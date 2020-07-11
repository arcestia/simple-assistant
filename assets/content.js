chrome.runtime.sendMessage({todo: "showPageAction"});

let isSuccess = ($('.notice-success').length > 0);
let isFailure = ($('.notice-danger').length > 0);
let input = $('#sample1');
let form = $('#submit');

let states = {
  isActive: null,
  current:  null,
  baseline: null
};

chrome.storage.sync.get("isActive", state => {
  states.isActive = state.isActive === 'true' ? 1 : 0;
  chrome.storage.sync.get("baseline", bet => {
    states.baseline = bet.baseline;
    chrome.storage.sync.get("current", bet => {
      if (isFailure) {
        states.current = bet.current*2;
      } else if (isSuccess) {
        states.current = states.baseline;
      } else {
        states.current = bet.current;
      }
      chrome.storage.sync.set({current: states.current});

      function timeout() {
        setTimeout(() => {
          input.val(states.current);

          setTimeout(() => {
            form.submit();
          },250)
          }, Math.floor(Math.random()*1000)+250)
      }

      let header = $('.kt-subheader__title');
      let newHeader = ` | Gambler: [ ${states.isActive} | ${states.baseline} | ${states.current} ]`;
      header.append(newHeader);

      let initButton = $('<button></button>')
        .text(states.isActive ? 'Stop' : 'Begin')
        .css({"margin-left": '1rem', "border-radius": "1rem"})
        .click(() => {
          if (states.isActive) {
            chrome.storage.sync.set({isActive: 'false'})
          } else {
            chrome.storage.sync.set({isActive: 'true'});
            timeout()
          }
        });
      header.append(initButton);

      if (states.isActive) {
        timeout();
      }
    });
  });
});