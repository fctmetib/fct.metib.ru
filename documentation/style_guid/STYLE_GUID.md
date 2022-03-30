# Style гайд (в процессе)

## Файлы (все)
Название файлов следует составлять, по такому примеру name-name.extension.type (user-name.interace.ts),
исключение составляют интерфейсы из АПИ, для облегчения работы (UserName.interface.ts / userName.interface.ts).

## Название стилей (css / html)
1. name - название root компонента (cabinet).
2. name-name - название child компонента (cabinet-stats).
3. name-name__inner - название объектов, в компоненте (cabinet-stats__chart).

## Переменные
1. name - обычная public переменная
2. name$ - observable public переменная
3. _name - обычная private переменная 
4. _name$ - observable private переменная

