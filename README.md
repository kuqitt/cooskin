
# 微信助手机器人 - wechaty-puppet-padlocal

项目支持

<!-- PROJECT SHIELDS -->
显示github一系列标签
  
  ![GitHub issues](https://img.shields.io/github/issues/kuqitt/wechaty_bot)
  ![GitHub forks](https://img.shields.io/github/forks/kuqitt/wechaty_bot)
  ![GitHub stars](https://img.shields.io/github/stars/kuqitt/wechaty_bot)
  ![GitHub license](https://img.shields.io/github/license/kuqitt/wechaty_bot)
  ![GitHub All Releases](https://img.shields.io/github/downloads/kuqitt/wechaty_bot/total)
  ![GitHub release (latest by date)](https://img.shields.io/github/v/release/kuqitt/wechaty_bot)
  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kuqitt/wechaty_bot)
  ![GitHub last commit](https://img.shields.io/github/last-commit/kuqitt/wechaty_bot)
  ![GitHub top language](https://img.shields.io/github/languages/top/kuqitt/wechaty_bot)


<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/kuqitt/wechaty_bot/">
    <img src="./th.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">大胆的尝试它</h3>
  <p align="center">
    定制机器人，给你无限可能
    <br />
    <a href="https://github.com/kuqitt/wechaty_bot/issues">报告Bug</a>
    ·
    <a href="https://github.com/kuqitt/wechaty_bot/issues">提出新特性</a>
  </p>

</p>

## 目录
 - [关于项目](#关于项目)
  - [开始使用](#开始使用)
  - [贡献](#贡献)
  - [示例](#示例)

  ## 关于项目
  ### 项目介绍
  本项目是基于wechaty-puppet-padlocal的二次开发，主要是为了方便大家使用，提供了一些常用的功能，如：日记，记账本，定时通知，天气播报，车票查询等功能，后续会继续更新，欢迎大家提出宝贵的意见。
  ## 开始使用
  ### 安装
  #### 拉取代码
  ```sh
  git clone https://github.com/kuqitt/wechaty_bot.git
  ```
  #### 安装依赖
  ```sh
  npm install
  ```
  #### 启动项目
  ```sh
  npm run serve
  ```
  ### 配置
  #### 配置文件
  ```sh
  src/config.js
  ```
  #### 需要配置
  ```sh
  // 机器人名字
  name: '小助手',
  //机器人token
  token：'你的token',
  //接口地址
  apiUrl:{
    //线上请求地址
    local:'http://localhost:8888',
    online:'http://XX.XX.XX.XX',
    type :'online' //local 本地  online 线上
  }
  ```
 ## :two_hearts: 贡献

