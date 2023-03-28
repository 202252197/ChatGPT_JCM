<template>
    <div class="person-card" :class="{ activeCard: fileInfo.fileId == pcCurrent }">
      <div class="info">
        <div>
            <svg t="1679461381774" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4047" width="50" height="50"><path d="M752 80H272c-70.4 0-128 57.6-128 128v608c0 70.4 57.6 128 128 128h353.6c33.6 0 65.6-12.8 91.2-36.8l126.4-126.4c24-24 36.8-56 36.8-91.2V208c0-70.4-57.6-128-128-128zM208 816V208c0-35.2 28.8-64 64-64h480c35.2 0 64 28.8 64 64v464h-96c-70.4 0-128 57.6-128 128v80H272c-35.2 0-64-28.8-64-64z m462.4 44.8c-4.8 4.8-9.6 8-14.4 11.2V800c0-35.2 28.8-64 64-64h75.2l-124.8 124.8z" fill="#ffffff" p-id="4048"></path><path d="M368 352h288c17.6 0 32-14.4 32-32s-14.4-32-32-32H368c-17.6 0-32 14.4-32 32s14.4 32 32 32zM496 608h-128c-17.6 0-32 14.4-32 32s14.4 32 32 32h128c17.6 0 32-14.4 32-32s-14.4-32-32-32zM368 512h288c17.6 0 32-14.4 32-32s-14.4-32-32-32H368c-17.6 0-32 14.4-32 32s14.4 32 32 32z" fill="#ffffff" p-id="4049"></path></svg>
        </div>
        <div class="info-detail">
          <div class="name">{{ fileInfo.name.slice(0, 25) }}</div>
          <div class="detail">{{ fileInfo.lastMsg.slice(0, 40) }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
    props: {
      fileInfo: {
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
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      text-overflow: ellipsis;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
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
