import request from '@/utils/request'
export default{
    getList(){
        return request({
            url:'/admin/core/integralGrade/list',
            method:'get'
        });
    },
    removeById(id){
        return request({
            url:`/admin/core/integralGrade/removeById/${id}`,
            method:'delete'
        });
    },
    save(integralGrade){
        return request({
            url:`/admin/core/integralGrade/save`,
            method:'post',
            data:integralGrade
        });
    },
    getDataById(id){
        return request({
            url:`/admin/core/integralGrade/getById/${id}`,
            method:'get'
        });
    },
    updateById(integralGrade){
        return request({
            url:`/admin/core/integralGrade/updateById`,
            method:'put',
            data:integralGrade
        });
    },
}