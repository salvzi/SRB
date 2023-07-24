import request from "@/utils/request";

export default {
  getBorrowInfoList() {
    return request({
      url: `/admin/core/borrowInfo/getBorrowInfoList`,
      method: "get",
    });
  },
  show(borrowInfoId) {
    return request({
      url: `/admin/core/borrowInfo/show/${borrowInfoId}`,
      method: "get",
    });
  },

  approvalSubmit(borrowInfoApproval) {
    return request({
      url: `/admin/core/borrowInfo/approvalSubmit`,
      method: "post",
      data:borrowInfoApproval
    });
  },

};
