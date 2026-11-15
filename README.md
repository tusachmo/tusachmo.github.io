# Tủ Sách Mở

Trang web tĩnh đăng sách giấy phép mở bản tiếng Việt, đặt trên GitHub Pages.

## Cấu trúc

- `src/home.html`: nội dung trang chủ.
- `src/style.css`: giao diện.
- `content/`: mỗi file Markdown là một trang. `content/y-van-mo/vi-sinh/chuong-1.md` thành địa chỉ `/y-van-mo/vi-sinh/chuong-1/`.
- `build.js`: dựng tất cả vào thư mục `docs/`.
- `docs/`: kết quả đã dựng, GitHub Pages phục vụ thư mục này. Không sửa tay.

## Thêm một chương sách

Tạo file `.md` trong `content/`, mở đầu bằng khối khai báo:

```
---
title: Chương 1. Miễn dịch bẩm sinh
ban_goc: Microbiology, Pharmacology, and Immunology for Pre-Clinical Students
tac_gia: Jennifer L. Cleveland, Andrew P. Binks, Renée J. LeClair
giay_phep: CC BY 4.0
nguon: https://doi.org/10.21061/micropharmimmuno
thay_doi: Dịch sang tiếng Việt, có chú thích thuật ngữ
---
Nội dung chương viết bằng Markdown.
```

Các dòng `ban_goc`, `tac_gia`, `giay_phep`, `nguon`, `thay_doi` tạo ra khối ghi nguồn ở đầu trang. Giấy phép CC BY yêu cầu ghi đủ các thông tin này.

## Dựng và đăng

```
npm install
npm run build
git add -A && git commit -m "Thêm chương mới" && git push
```

## Bật GitHub Pages

Trong repository: Settings, Pages, mục Source chọn "Deploy from a branch", nhánh `main`, thư mục `/docs`.
