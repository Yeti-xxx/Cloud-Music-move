# 简单的仿网易云项目
学完vue独立做的第一个项目，缺陷很多，希望得到大家的斧正^_^  
前端：vue3 + elementPlus + vueX  
后端：感谢[Binaryify大佬](https://github.com/Binaryify)提供的接口   

##安装

    npm install

    npm run dev

## 在线演示
🛸🛸[仿网易云](http://121.4.123.199:8883/#/home)  
现在已经将后端接口和前端页面都部署在国内。  
ps:请打开谷歌浏览器的移动端模式。  
**如果首页无数据，请尝试下拉刷新**!!  
**目前已经支持二维码登录，但云盘与刷新视频等功能暂时无法使用**!!  
## 功能

### 🏚️home页面:
  1.搜索功能：由于后端的数据较少，所以做的比较简单;  

  ![image](https://user-images.githubusercontent.com/100813306/199457815-a46117cc-ceaa-4317-8843-23ae82eee185.png)

  2.每日推荐歌单;
  3.大家都在听;
  4.下拉获取新数据;
  
### 😃my页面:
  1.初始进入时显示需要登录状态：

  ![image](https://user-images.githubusercontent.com/100813306/199456767-f630ae69-08b9-4941-b05e-0eb216146261.png)
  ![image](https://user-images.githubusercontent.com/100813306/199457035-0b04d67b-6eff-4c63-9af4-92648fca4d52.png)

  2.登录后获取个人信息并本地化存储:

  ![image](https://user-images.githubusercontent.com/100813306/199457191-ce549c26-bcea-4669-9b71-bc930c7e0603.png)

  3.查看个人资料详情功能：

  ![image](https://user-images.githubusercontent.com/100813306/199457389-00d4b839-d90f-49c1-b2f6-4a98db424e99.png)

  4.修改个人资料：
  包括头像、生日、nickname等： 

  ![image](https://user-images.githubusercontent.com/100813306/199457583-ac12cf71-217e-46a7-8c33-951811002f81.png)
  ![image](https://user-images.githubusercontent.com/100813306/199457629-bc40085a-f348-418e-9a88-cdffb4ba15ea.png)
  
### ☁️cloud云盘页面:

  1.获取云端存储的歌曲，并且可对其进行管理：
  
  ![image](https://user-images.githubusercontent.com/100813306/199458294-99edddef-ae8e-4a1a-b24e-964eac4b5ef7.png)
  
### 🎧歌曲详情页面:
  1.歌曲详情页面可进行封面/歌词切换，顶部可下载和查看评论，顶部进行歌曲切换：

  ![image](https://user-images.githubusercontent.com/100813306/199458768-e409f88f-8a8d-438b-8852-d0f4e287437b.png)
  ![image](https://user-images.githubusercontent.com/100813306/199458801-27b3c616-7302-4bca-9ece-0c4a74067ff9.png)
  ![image](https://user-images.githubusercontent.com/100813306/199458886-b8fc5347-4b3c-4f75-9080-99b046b4cd4e.png)
  
### 🎬社区功能：
  1.实现听音乐的同时，刷刷视频,感觉某些地方的逻辑怪怪的，后续找到问题会修复的

  ![image](https://user-images.githubusercontent.com/100813306/200152945-ee3c40f6-9399-4f0f-b758-fa14c058ac4d.png)

  
  

