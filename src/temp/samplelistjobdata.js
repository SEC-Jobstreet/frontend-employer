const sampleJob = {
  status: "Đã Xem",
  freshnessTime: "41 phút trước",
  title: "CUSTOMER CARE [DISTRICT 2]",
  company: "Yola Education",
  location: "Hồ Chí Minh",
  jobAstract:
    "Quản lý hồ sơ, thông tin quá trình học tập của học sinh và lớp học - Chuẩn bị sách vở, dụng cụ cho giáo viên và học sinh - Chăm sóc học...",
  listedDate: "7 giờ trước",
  link: "/#",
};

const SearchResult = Array.from({ length: 100 }, (_, index) => ({
  ...sampleJob,
  id: index + 1,
}));

const SavedJob = Array.from({ length: 100 }, (_, index) => ({
  [index + 1]: false,
}));

export { SearchResult, sampleJob, SavedJob };
