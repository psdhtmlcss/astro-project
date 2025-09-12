---
title: 'Markdown Style Guide'
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jun 19 2024'
heroImage: '../../assets/blog-placeholder-1.jpg'
---

Похоже, у тебя задан `credential.helper` = `osxkeychain`. Значит, Git хранит HTTPS‑креды в Связке ключей macOS.

Что делать дальше:
1) Очисти старые сохранённые креды для GitHub:
```bash
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
```

2) Убедись, что `origin` — это HTTPS и какой именно репозиторий:
```bash
git remote -v
```

3) Сделай push — Git попросит логин и пароль:
- логин: твой GitHub username
- пароль: персональный токен (PAT), не пароль аккаунта
Создать PAT: `https://github.com/settings/personal-access-tokens` (дай доступ как минимум к repo; для fine‑grained выбери нужный репозиторий и разрешения на чтение/запись).

Важно:
- Если затем снова получишь “Permission denied to psdhtmlcss/astro-project.git”, это вопрос прав: либо попроси доступ (Write) к `psdhtmlcss/astro-project`, либо пушь в свой форк:
```bash
git remote set-url origin https://github.com/<твой_логин>/astro-project.git
git push -u origin HEAD
```
- Альтернатива — перейти на SSH, если удобнее, подскажу команды.
