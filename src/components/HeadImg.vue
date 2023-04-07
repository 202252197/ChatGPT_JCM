<template>
    <div class="head-portrait">
        <img
          src="https://i.328888.xyz/2023/04/07/irgoxk.png"
          alt="Kevin Powell"
        />
      </div>
  </template>
  
  <script>
  import {USER_HEAD_IMG_URL} from '@/store/mutation-types'
  export default {
      props: {
          imgUrl:{ default:USER_HEAD_IMG_URL}
      }
  }
  </script>
  
  <style lang="scss" scoped>
    img {
      --s: 75px; /* image size */
      --b: 3px; /* border thickness */
      --c: #255b98; /* border color */
      --cb: #a34c4c; /* background color */
      --_g: content-box no-repeat center / calc(100% / var(--f)) 100%; /* content-box: 内容区域开始显示背景图 放大后背景图大小不变 */
      --_o: calc(
        (1 / var(--f) - 1) * var(--s) / 2 - var(--b)
      ); /* offset 相对于原来的长度，所以放大的长度-原来的长度除以2在除以倍数 */
      --f: 1; /* initial scale */
      --mh: calc(1px - var(--_o)) / calc(100% / var(--f) - 2 * var(--b) - 2px);
      width: var(--s);
      aspect-ratio: 1;
      padding-top: calc(var(--s) / 5); /* 防止上面挡住人物，保留上部分空间 */
      cursor: pointer;
      border-radius: 0 0 999px 999px;
      outline: var(--b) solid var(--c);
      outline-offset: var(--_o);
      background: radial-gradient(
          circle closest-side,
          var(--cb) calc(99% - var(--b)),
          var(--c) calc(100% - var(--b)),
          var(--c) 99%,
          transparent 100%
        )
        var(--_g);
      -webkit-mask: linear-gradient(#000 0 0) no-repeat center var(--mh) 50%,
        radial-gradient(circle closest-side, #000 99%, #0000) var(--_g);
      transform: scale(var(--f));
      transition: 0.45s;
    }
    img:hover {
      --f: 1.4; /* hover scale */
    }
  </style>
  
  <!-- <style lang="scss" scoped>
  .head-portrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // border: 2px solid rgb(137,140,151);
      border: 2px solid rgb(255, 255, 255);
      position:relative;
      &::before {
          content: '';
          width: 15px;
          height: 15px;
          z-index: 1;
          display: block;
          border-radius: 50%;
          background-color: rgb(144,225,80);
          position: absolute;
          right: 0;
      }
      img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          // padding: 2px;
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          vertical-align: middle;
      }
  }
  </style> -->