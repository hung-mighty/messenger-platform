# Facebook Messenger Chatbot Setup

Hướng dẫn từng bước để tạo chatbot Messenger

## Yêu cầu

- Tài khoản [Facebook Developer](https://developers.facebook.com/)
- Fanpage Facebook

## Các bước cấu hình

### 1. Tạo Fanpage Facebook

Vào Facebook → Tạo trang mới.

---

### 2. Tạo ứng dụng

Truy cập [Meta for Developers](https://developers.facebook.com/apps/) → **Create App**  
Chọn loại ứng dụng phù hợp (Business / Other).

![Create App](docs/images/image.png)  
![App Settings](docs/images/image-1.png)  
![Messenger Product](docs/images/image-2.png)  
![App Dashboard](docs/images/image-3.png)

---

### 3. Thiết lập Messenger

Chọn **Messenger** trong App Dashboard → Bật.

![Messenger Setup](docs/images/image-4.png)

---

### 4. Đăng ký Webhook

Nhập **Webhook URL** và **Verify Token** (tự tạo, lưu trong `.env`).

![Webhook Register](docs/images/image-5.png)  
![Webhook Fields](docs/images/image-13.png)  
![Webhook Confirm](docs/images/image-14.png)

---

### 5. Kết nối với Fanpage

Chọn fanpage đã tạo để kết nối.

![Connect Page](docs/images/image-6.png)

---

### 6. Đăng ký các trường thông tin (webhook fields)

![Webhook Fields](docs/images/image-7.png)
![Webhook Fields](docs/images/image-8.png)

---

### 7. Tạo Page Access Token

Copy **Page Access Token** và lưu vào `.env`.

![Token Example](docs/images/image-9.png)

---

### 8. Chuyển ứng dụng sang chế độ chính thức

![Switch App Mode](docs/images/image-10.png)

---

### 9. Thêm URL Chính sách Quyền riêng tư

Có thể tạo nhanh tại [Free Privacy Policy Generator](https://app.freeprivacypolicy.com/wizard/privacy-policy).

![Privacy Policy](docs/images/image-12.png)

---

## Cấu hình môi trường

Tạo file `.env` trong project:

```env
PAGE_ACCESS_TOKEN=<your_page_access_token>
VERIFY_TOKEN=<your_verify_token>
APP_SECRET=<your_app_secret>
```
