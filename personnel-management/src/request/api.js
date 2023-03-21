import serve from './index'
// 登录
export const login = (data)=>serve({
  url:"/login",
  method:"post",
  data
})
// 登录持久化
export const getUser = ()=>serve({
  url:'/getUser',
  method:"get",
})
// 获取员工数据
export const getEmployee = (data)=>serve({
  url:"/getEmployee",
  method:"get",
  data
})
// 修改员工数据
export const editEmployee = (data)=>serve({
  url:"/editEmployee",
  method:"post",
  data
})
// 删除员工数据
export const deleteEmployee = (data)=>serve({
  url:"/deleteEmployee",
  method:"post",
  data
})
// 新增员工
export const addEmployee = (data)=>serve({
  url:"/addEmployee",
  method:"post",
  data
})