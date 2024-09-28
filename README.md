# Hướng Dẫn Sử Dụng Bot

Để sử dụng bot này, bạn có thể lựa chọn một trong ba môi trường: Node.js, Deno hoặc Bun.
---

### Cài và chạy

<details>
<summary>Nhấp vào đây để mở rộng hướng dẫn cài đặt Node.js</summary>

## Node.js

1. Cài đặt các gói cần thiết:
  ```bash
  npm install
  ```

2. Khởi chạy bot:
  ```bash
  npm run start
  ```

</details>

<details>
<summary>Nhấp vào đây để mở rộng hướng dẫn cài đặt Deno</summary>

## Deno

1. Khởi chạy bot trực tiếp với quyền truy cập toàn bộ (tùy chọn `-A` cho phép truy cập tất cả các quyền):
  ```bash
  deno run -A .\index.js
  ```

</details>

<details>
<summary>Nhấp vào đây để mở rộng hướng dẫn cài đặt Bun</summary>

## Bun

1. Cài đặt các gói cần thiết:
  ```bash
  bun install
  ```

2. Khởi chạy bot:
  ```bash
  bun run start
  ```

</details>

---

### Setup .env
Hãy tạo file .env với nội dung
<details>
<summary>.env</summary>

  ```text
  PREFIX=!
  Cookie = ""
  IMEI = ""
  UserAgent = ""
  # Không bắt buộc:
  SelfListen = false
  ```
</details>

---
### Chưa cài NodeJS, Deno hoặc Bun ?????
[NodeJS](https://nodejs.org/en/download/package-manager)

[Deno](https://deno.com/)

[Bun](https://bun.sh/)