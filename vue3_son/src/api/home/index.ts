import request from "@/utils/request";
// 营业概况统计查询
export function getStatisticsData() {
  return request({
    url: '/home/statistics',
    method: 'GET'
  })
}