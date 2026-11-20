# Tủ Sách Mở

Trang web tĩnh đăng sách giấy phép mở bản tiếng Việt. Địa chỉ: https://tusachmo.github.io
Kho: `tusachmo/tusachmo.github.io`. GitHub Pages phục vụ thư mục `/docs` của nhánh `main`.

Trả lời chủ trang bằng tiếng Việt.

## Cấu trúc

- `src/home.html`: nội dung trang chủ (phần thân, không có khung).
- `src/style.css`: toàn bộ giao diện. Màu và phông khai báo ở `:root`.
- `content/`: mỗi file Markdown là một trang. `content/a/b.md` thành `/a/b/`, `content/a/index.md` thành `/a/`.
- `build.js`: dựng mọi thứ vào `docs/`. Khung trang, menu và chân trang nằm trong hàm `layout()`.
- `docs/`: kết quả đã dựng. Không sửa tay, luôn dựng lại bằng lệnh.

Bốn ngăn sách tương ứng bốn thư mục trong `content/`: `y-van-mo`, `toan-khoa-hoc`, `bai-viet`, `on-thi`. Thêm ngăn mới thì thêm vào mảng `NAV` trong `build.js` và thẻ trên trang chủ.

## Lệnh

```
npm install
npm run build
```

Sau khi sửa nội dung: dựng lại, kiểm tra `docs/`, rồi commit cả nguồn lẫn `docs/` và push lên `main`. Trang cập nhật sau khoảng một phút.

## Thêm một chương sách dịch

Đặt file tại `content/<ngăn>/<tên-sách>/<chương>.md`, mở đầu bằng:

```
---
title: Chương 1. Tên chương
ban_goc: Tên sách gốc
tac_gia: Tên các tác giả
giay_phep: CC BY 4.0
nguon: https://đường-dẫn-bản-gốc
thay_doi: Dịch sang tiếng Việt, có chú thích thuật ngữ
---
```

Các dòng này tạo khối ghi nguồn ở đầu trang. Không được bỏ: giấy phép Creative Commons yêu cầu ghi nguồn, giấy phép và phần đã thay đổi.

## Quy tắc về bản quyền

- Chỉ đăng tác phẩm đã hết hạn bản quyền hoặc có giấy phép cho phép dịch (CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA). Không đăng tài liệu chỉ "miễn phí để đọc" hoặc có điều khoản ND.
- Sách giấy phép NC (ví dụ cuốn của Spivak, CC BY-NC-SA 4.0, bản MIT OpenCourseWare 2013): đăng miễn phí, không quảng cáo, không thu tiền trên các trang đó, bản dịch mang cùng giấy phép. Thêm câu miễn trừ của OCW rằng sai sót do dịch thuộc trách nhiệm người dịch.
- Hình ảnh trong sách gốc có thể mang giấy phép riêng. Chỉ đăng chữ cho tới khi từng hình được kiểm tra.
- Không dùng tên, logo hay bìa của nhà xuất bản gốc (OpenStax, MIT, Virginia Tech) ngoài phần ghi nguồn.
- Cuốn "Put Off Procrastinating" của CCI giữ toàn bộ quyền. Không đăng khi chưa có văn bản cho phép.

## Việc đang làm

Dịch cuốn *Microbiology, Pharmacology, and Immunology for Pre-Clinical Students* (Cleveland, Binks, LeClair; Virginia Tech, 2025; CC BY 4.0).
Bản gốc: https://pressbooks.lib.vt.edu/micropharmimmuno/ (DOI: https://doi.org/10.21061/micropharmimmuno)

Sách có 9 chương và 2 phụ lục: miễn dịch (1), vi sinh cơ bản (2), nhiễm trùng theo hệ cơ quan (3 đến 8), nguyên tắc điều trị (9). Mỗi chương dài, chia nhiều mục, nên đăng theo từng mục.

Bắt đầu từ Chương 1, mục 1.1 đến 1.3 (giới thiệu, hàng rào vật lý, cơ chế cơ học và hệ vi sinh vật). Chủ trang cung cấp bản dịch thô; việc ở đây là đối chiếu bản gốc, soát thuật ngữ, dựng trang và đăng.

Đặt tại `content/y-van-mo/vi-sinh-duoc-ly-mien-dich/`.

## Bảng thuật ngữ (dùng thống nhất)

| Tiếng Anh | Tiếng Việt |
|---|---|
| innate (nonspecific) immunity | miễn dịch bẩm sinh (không đặc hiệu) |
| adaptive (specific) immunity | miễn dịch thích ứng (đặc hiệu) |
| pathogen | tác nhân gây bệnh |
| opportunistic pathogen | tác nhân gây bệnh cơ hội |
| physical barriers | hàng rào vật lý |
| mechanical defenses | cơ chế bảo vệ cơ học |
| microbiome | hệ vi sinh vật |
| resident microbiota | hệ vi sinh vật thường trú |
| tight junction | liên kết chặt |
| desmosome | thể liên kết (desmosome) |
| gap junction | liên kết khe |
| epidermis / dermis / hypodermis | thượng bì / trung bì / hạ bì |
| mucous membrane | niêm mạc |
| mucus | chất nhầy |
| goblet cell | tế bào hình đài |
| ciliated epithelial cell | tế bào biểu mô có lông chuyển |
| mucociliary escalator | hệ thống thanh thải nhầy lông chuyển |
| peristalsis | nhu động |
| endothelia | nội mô |
| blood-brain barrier | hàng rào máu não |
| antimicrobial peptides | peptide kháng khuẩn |
| colonization | sự định cư (của vi khuẩn) |
| cystic fibrosis | bệnh xơ nang |
| physical / chemical / cellular defenses | cơ chế bảo vệ vật lý / hóa học / tế bào |
| cell junction | liên kết tế bào |
| extracellular matrix | chất nền ngoại bào |
| mucociliary blanket | thảm nhầy lông chuyển |
| cilia | lông chuyển |
| normal microbiota | hệ vi sinh vật bình thường |
| transient microbes | vi sinh vật thoáng qua |
| sterile | vô khuẩn |
| portal of entry | đường vào |
| plasma protein mediators | chất trung gian là protein huyết tương |
| inflammation-eliciting mediators | chất trung gian gây viêm |
| granulocytes / agranulocytes | bạch cầu hạt / bạch cầu không hạt |
| central nervous system (CNS) | hệ thần kinh trung ương (CNS) |
| cerebrospinal fluid | dịch não tủy |
| fecal transplantation | cấy ghép phân |

Chưa chốt: "dermis" (trung bì hay chân bì) và "mucociliary escalator". Hỏi chủ trang trước khi đổi, và bổ sung thuật ngữ mới vào bảng này khi gặp.

## Quy ước

- Người dịch ghi là "Clayman". Không đưa tên thật hay thông tin cá nhân của chủ trang vào kho, vì kho công khai.
- Trang nói rõ bản dịch có dùng AI hỗ trợ và được hiệu đính thuật ngữ.
- Chữ trên trang viết câu ngắn, trực tiếp, không dùng emoji.
