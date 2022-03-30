# Модуль Auth

# # Архитектура
- components
- - confirm-password-page - страница подтверждения нового пароля
- - login-page - страница авторизации
- - register-page - страница регистрации
- - reset-password-page - страница сброса пароля
- services
- - auth.service - отвечает за авторизацию в приложении
- tools 
- types
- store
- - actions - Actions модуля Client
- - effects - Effects модуля Client, отвечает за инкапсуляцию логики
- - actionTypes - ActionTypes модуля Client
- - reducers - Reducers модуля Client, отвечает за обновление Store
- - selectors - Selectors модуля Client, выполняет задачи выборки данных из Store
- types - модели данных
