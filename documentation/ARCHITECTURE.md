# Общий концепт

Вся Архитектура строится на основе модульной структуры:
- module
- - components
- - services
- - - store.service.ts
- - store
- - - actions
- - - effects
- - - actionTypes.ts
- - - reducers.ts 
- - - selectors.ts 
- - tools
- - types
- - routing.module.ts
- - module.ts

Наименование Структуры | Описание
------------ | -------------
components | в этой папке могут содержаться целые страницы (-page), модальные окна (-dialog) или shared компоненты
services | данная папка содержит сервисы, которые "общаются" с API
store | папка, которая содержит в себе архитектуру NgRx и отвечает за логику хранилища (store)
actions | папка, которая содержит в себе файлы, с описанием действий
effects | в данной папке находится основная Бизнес Логика хранилища (store)
actionTypes | в данном файле описаны константы, которые используются при работе с хранилищем (store)
reducers | данный файл отвечает за управление состояниями (state) хранилища (store)
selectors | в данном файле описана логика, позволяющая делать выборку из хранилища (store)
tools | папка, в которой находятся вспомогательные сервисы, могут обращаться к сторонним API или реализовывать внутреннюю логику приложения
types | папка, в которой содержатся модели данных (interface)
routing.module | файл, который отвечает за роутинг в конкретном модуле
module | файл, который отвечает за конкретную модульную структуру.
store.service.ts | файл, который отвечает за хранилище, в тех случаях, когда NgRx паттерн и/или реализация не позволяет реализовать необходимый функционал, если в дальнейшей разработке будет использоваться наиболее востребовано - необходимо полностью перейти с NgRx, на данную логику, для сохранения единого архитектурного решения.
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
