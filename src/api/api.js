import {DEL, get, postBase} from './request'

// 首页请求
export const getStatistic = marketId => get('/web/visitor/statistic?marketId=' + marketId)

// 获取商家列表信息
export const getMerchantManage = data => postBase('/web/merchant/list', data)

// 根据商家id删除商家信息
export const deleteMerchantById = merchantId => DEL('/web/merchant?id=' + merchantId)

// 根据商家id获取商家信息
export const getMerchantById = merchantId => get('/web/merchant?id=' + merchantId)
// 保存商家信息
export const commitMerchantEntity = merchant => postBase('/web/merchant/save', merchant)
// 根据id数组批量删除商家信息
export const deleteMerchantBatchId = ids => postBase('/web/merchant/batchDel', ids)
export const getProjectList = data => postBase('/web/project/list', data)
export const getMerchantListToProject = () => get('/web/merchant/list')
export const saveProject = project => postBase('/web/project/save', project)
export const deleteProjectById = projectId => DEL('/web/project?id=' + projectId)
export const deleteProjectByIds = projectIds => postBase('/web/project/batchDel', projectIds)
export const getEquipmentList = pageParam => postBase('/web/equipment/list', pageParam)
export const findMerchantByName = merchantName => get('/web/merchant/findByName?companyName=' + merchantName)
export const getEquipmentCheckList = equipmentCheckParam => postBase('/web/equipmentCheck/list/', equipmentCheckParam)
export const addEquipmentCheck = equipmentCheck => postBase('/web/equipmentCheck/save', equipmentCheck)

// 根据项目获取项目信息
export const getProjectAndEquipmentList = projectId => get('/web/project?id=' + projectId)

// 根据设备id查询设备信息
export const findEquipmentById = equipmentId => get('/web/equipment/findEquipmentById?id=' + equipmentId)

// 修改设备信息
export const updateEquipmentById = equipment => postBase('/web/equipment', equipment)

/**
 * 用户管理
 */
// 获取详情
export const getProjectDetail = id => get('/web/project?id=' + id)
// 用户列表
export const userList = data => postBase('/web/user/list', data)
// 新增/注册
export const saveUser = data => postBase('/web/user', data)
// 删除单个用户
export const deleteUser = id => DEL('/web/user?id=' + id)
// 批量删除用户
export const deleteUserBatch = ids => postBase('/web/user/batch', ids)
// 查询用户详情
export const detailUser = id => get('/web/user?id=' + id)
// 审核
export const userAudit = data => postBase('/web/user/audit', data)
/**
 * 统计信息
 **/
// 访问峰值
export const visitPeaks = id => get('/web/visitor/visitPeaks?marketId=' + id)
// 时间可变动的预览
export const timerScopeStatistic = (id, timerScope) => get('/web/visitor/statistic/timerScope?marketId=' + id + '&timerScope=' + timerScope)
// 固定一周访问数据
export const weekStatistic = id => get('/web/visitor/statistic/week?marketId=' + id)
// 实时抓怕数据
export const realTimeStatistic = id => get('/web/visitor/statistic/realtime?marketId=' + id)
// 获取商家地址数组信息
export const cascader = merchantId => get('/web/project/cascader?merchantId=' + merchantId)
// 根据条件对象查询项目信息
export const pName = searchProjectParam => postBase('/web/project/pName', searchProjectParam)
// 根据项目id查询设备点位信息
export const findDoorNumByProjectId = projectId => get('/web/equipment/findDoorNumByProjectId?projectId=' + projectId)
// dataPage搜索数据
export const overview = overviewParam => postBase('/web/visitor/search/infos', overviewParam)

/**
 * 登录
 */
export const login = data => postBase('/web/login', data)
