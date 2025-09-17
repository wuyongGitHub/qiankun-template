import request from "@/utils/request";
export function test1() {
  // Promise对象
  const _promist = request.get('/test')
  _promist.then(response => {
    console.log("test", response);
  }).catch(error => {
    console.log("error", error);
  });
}
export function getList() {
  // Promise对象
  return request({
    url: '/test',
    method: 'get',
  });
}