<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Auto-repeat selected quest</span>
    </div>
    <button class="btn btn-primary" @click="selectLast">Select last incomplete</button>
  </div>
</template>

<script lang="ts">
// TODO: add checkbox to force use of Knight
// TODO: add success check and use Knight if <100%

import module from '../mixins/module';

export default {
  name:   "Quests",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto: true,
      },
    };
  },

  methods: {
    selectLast() {
      let quests = Array.prototype.slice.call(document.getElementsByClassName('kt-widget5__title'));
      try {
        quests.reverse().forEach((entry: HTMLElement) => {
          if (!entry.children.length) {
            let button = entry.parentElement.parentElement.parentElement.children[1].children[0].children[0] as HTMLButtonElement;
            button.click();
            throw 'Break forEach';
          }
        });
      } catch {
      }
    },
    init() {
      Array.prototype.slice.call(document.getElementsByClassName('btn-info')).forEach((entry: HTMLElement) => {
        entry.addEventListener('click', () => {
          if (this.options.isAuto) {
            setTimeout(() => {
              let interval = setInterval(() => {
                try {
                  let button = document.getElementsByClassName('swal2-confirm')[0] as HTMLElement;
                  let plug   = document.getElementsByClassName('swal2-validation-message')[0] as any; // to let use attributeStyleMap
                  if (plug.attributeStyleMap.size === 3) {
                    clearInterval(interval);
                    let background = document.querySelector('.swal2-container.swal2-center.swal2-shown') as HTMLElement;
                    background.click();
                  } else if (button.innerText.indexOf('Repeat') !== -1 || button.innerText.indexOf('Perform') !== -1)
                    button.click();
                } catch (err) {
                  clearInterval(interval);
                }
              }, 750 + Math.floor(Math.random() * 500));
            }, 500 + Math.floor(Math.random() * 500));
          }
        });
      });

      //          Legacy Cycle

      // if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 1) {
      //   if (parseInt($('#current_quest_points').text()) > 0)
      //     setTimeout(() => {
      //       data.doLast.action();
      //     }, 1000);
      //   else {
      //     engine.home.data.state.value = 'pending';
      //     engine.$set('home');
      //   }
      // }
    }
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>

</style>
