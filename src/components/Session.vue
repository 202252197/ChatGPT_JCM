<template>
  <div class="person-card" :class="{ activeCard: sessionInfo.id == current }">
    <div class="info">
        <div class="info-detail">
          <div class="detail">
            <div style="padding: 10px;">{{ sessionInfo.title }}</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    sessionInfo: {
      default: {
      },
    },
    pcCurrent: {
      default: ''
    }
  },
  data() {
    return {
      current: '',
    }
  },
  watch: {
    pcCurrent: function() {
      this.isActive()
    }
  },
  methods: {
    isActive() {
      this.current = this.pcCurrent
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  }
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    width: auto;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      .detail {
        color: #fff;
        font-size: 15px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}
.activeCard {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
}
</style>