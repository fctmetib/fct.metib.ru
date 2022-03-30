# Модуль Admin

# # Архитектура
- modules
- - cabinet - страница с новостями
- - organizations - страница с списком организаций
- - users - странца с пользователями
- shared
- - components
- - - card-news - компонент новостей
- - - card-row - компонент строки (используется на страницах users & organizations)
- - header
- - mobile-header
- - services
- - - admin-auth.interceptor - подставляет токен при HTTP запросах
- - - news.service - сервис для работы с новостями
- - - page-store.service - отвечает за визуальный контент, при переключении страниц
- - types
