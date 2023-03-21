## 2023/3/15
> 使用 软件：即时设计 制作了登录页面,并且实现在了web端上

原型图：
![登录页面](./md-images/Login.png)

## 2023/3/16
> 了解了常见的登录功能，并且学习了一些web安全知识
> 美化了登录页面的样式
> 实现了登录数据持久化  

将token值使用Cookie保存:
: **优点**：可以制定httponly，来防止被JavaScript读取，也可以制定secure，来保证,token只在HTTPS下传输。
: **缺陷**：容易遭受CSRF攻击，不能跨域

```javascript
import Cookie from 'js-cookie'
if (remember.value === true) { // remember为是否记住用户的标志位
        Cookie.set('token', res.data.token, { expires: 7 })
      }
```

## 2023/3/17
> 学习了权限管理的基本概念
> 了解了vue框架的动态路由实现
> 使用ant-design-vue的Layout布局组件设定布局
> 设计了功能页面的大概样式颜色搭配

## 2023/3/18
> 使用ant-design-vue 的表单功能
> 做出了筛选、排序、多选、单元格修改信息功能

使用的是前端现存数据的操作，如果需要后端操作，再说

## 2023/3/19
> 改良了表格的显示：加入了横向滚动条，并且第一栏滚动时浮动
> 制作了添加新员工的功能
> 考虑了表单数据结构的来源，决定从表格columns那里取来title属性和dataIndex属性作为label和key

###### 踩坑：
antdv 的表单校验->自定义校验:
    官方文档说必须调用callback，实际上会报错，
    应该使用Promise对象返回失败或者成功状态(reject/reslove)