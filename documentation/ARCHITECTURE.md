# Общий концепт

Вся Архитектура строится на основе модульной структуры:
- module
- - components
- - services
- - - store.service.ts
- - tools
- - types
- - routing.module.ts
- - module.ts

Наименование Структуры | Описание
------------ | -------------
components | в этой папке могут содержаться целые страницы (-page), модальные окна (-dialog) или shared компоненты
services | данная папка содержит сервисы, которые "общаются" с API
tools | папка, в которой находятся вспомогательные сервисы, могут обращаться к сторонним API или реализовывать внутреннюю логику приложения
types | папка, в которой содержатся модели данных (interface)
routing.module | файл, который отвечает за роутинг в конкретном модуле
module | файл, который отвечает за конкретную модульную структуру.

# Style гайд

[Гайд](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/style_guid/STYLE_GUID.md).

# Style гайд

[Гайд](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/style_guid/STYLE_GUID.md).

# Детальная Архитектура

Архитектура приложения разбивается на основные модули:
- Public (Публичный), данный модуль содержит в себе все страницы, которые доступны каждому пользователю, вне зависимости от роли и авторизации.
- Auth (Авторизация), данный модуль содержит в себе страницы, для осуществления авторизации.
- Admin (Администратор), данный модуль содержит в себе страницы администратора, доступ к котором имеет только администратор.
- Client (Клиент), данный модуль - является основным, доступ к нему имеют только действующие клиенты.
- Not-Verify-Client (Клиент без подтверждения), данный модуль - является не полной версией модуля Клиент, доступ к нему имеют только новые аккаунты.
- Shared (Общие), данный модуль предназначен, для предоставления переиспользуемых компонентов каждому модулю.

Более подробную информацию о каждом модуле можно найти в следующих документах:
- [Public](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/public/PUBLIC.md).
- [Auth](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/auth/AUTHENTICATION.md).
- [Admin](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/admin/ADMIN.md).
- [Client](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/client/CLIENT.md).
- [Not-Verify-Client](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/not-verify/NOT_VERIFY.md).
- [Shared](https://github.com/mmartisynuk/metallinvestbank-web/blob/master/documentation/shared/SHARED.md).
