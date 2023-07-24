import request from "@/utils/request";

export default {
  getPageList(page, limit, keyword) {
    return request({
      url: `/admin/core/borrower/getPageList/${page}/${limit}`,
      method: "get",
      params: { keyword },
    });
  },
  getBorrowerDetailVOById(borrowerId) {
    return request({
      url: `/admin/core/borrower/getBorrowerDetailVOById/${borrowerId}`,
      method: "get",
    });
  },
  approvalSubmit(approvalForm) {
    return request({
      url: `/admin/core/borrower/approvalSubmit/`,
      method: "post",
      data:approvalForm
    });
  },
};
