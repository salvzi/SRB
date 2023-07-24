import reqeust from '@/utils/request'

export default{
    getDictListByParentId(parentId){
        return reqeust({
            url:`/admin/core/dict/getDictListByParentId/${parentId}`,
            method:'get'
        });
    }
}