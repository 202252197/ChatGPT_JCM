<template>
  <div class="emoji-content">
    <div class="emoji">
      <div class="emoji-wrapper">
        <ul class="emoji-list">
          <li
            class="emoji-item"
            v-for="(item, index) in emojiList"
            :key="index"
            @click="sendEmoji(item)"
          >
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" @click="closeEmoji"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emojiList: [
        require("@/assets/img/emoji/slightly-smiling-face.png"),
        require("@/assets/img/emoji/smiling-face.png"),
        require("@/assets/img/emoji/smiling-face-with-heart-eyes.png"),
        require("@/assets/img/emoji/smiling-face-with-sunglasses.png"),
        require("@/assets/img/emoji/thinking-face.png"),
        require("@/assets/img/emoji/tired-face.png"),
        require("@/assets/img/emoji/money-mouth-face.png"),
        require("@/assets/img/emoji/loudly-crying-face.png"),
        require("@/assets/img/emoji/pouting-face.png"),
        require("@/assets/img/emoji/face-screaming-in-fear.png"),
        require("@/assets/img/emoji/face-vomiting.png"),
        require("@/assets/img/emoji/face-without-mouth.png"),
        require("@/assets/img/emoji/face-with-tongue.png"),
        require("@/assets/img/emoji/clown-face.png"),
        require("@/assets/img/emoji/new-moon-face.png"),
        require("@/assets/img/emoji/ghost.png"),
        require("@/assets/img/emoji/jack-o-lantern.png"),
        require("@/assets/img/emoji/money-bag.png"),
        require("@/assets/img/emoji/pile-of-poo.png"),
        require("@/assets/img/emoji/shamrock.png"),
        require("@/assets/img/emoji/hibiscus.png"),
        require("@/assets/img/emoji/lips.png"),
        require("@/assets/img/emoji/sparkles.png"),
        require("@/assets/img/emoji/star.png"),
        require("@/assets/img/emoji/two-hearts.png"),
        require("@/assets/img/emoji/rainbow.png"),
        require("@/assets/img/emoji/thought-balloon.png"),
      ],
    };
  },
  methods: {
    sendEmoji(item) {
      this.$emit("sendEmoji", item);
    },
    closeEmoji() {
      this.$emit("closeEmoji");
    }
  },
};
</script>

<style lang="scss" scoped>
.emoji-content {
  .emoji {
  width: 400px;
  height: 200px;
  background-color: rgb(39, 42, 55);
  position: absolute;
  top: -220px;
  left: -10px;
  border-radius: 10px;
  transition: 0.3s;
  z-index: 3;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid rgb(39, 42, 55);
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    position: absolute;
    bottom: -8px;
    left: 15px;
    z-index: 100;
  }
  .emoji-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
      background: rgb(95, 101, 122);
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
      border-radius: 10px;
      background: rgb(39, 42, 55);
    }
    .emoji-list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-left: 10px;
      .emoji-item {
        list-style: none;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin: 5px;
        position: relative;
        cursor: pointer;
        &:hover {
          background-color: rgb(50, 54, 68);
        }
        img {
          width: 35px;
          height: 35px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

}
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: transparent;
    left: 0;
    top: 0;
    z-index: 1;
  }
}

</style>