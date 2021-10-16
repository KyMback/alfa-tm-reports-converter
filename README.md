# [AlfaTM Converter](https://kymback.github.io/alfa-tm-reports-converter/)

Данный проект предназначен для конвертации отчётов доверительного управления Альфа-Банка Беларуси в необходимый вам
формат.

При использовании доверительного управления Альфа-Банка возникает необходимость следить за всеми сделками (покупкой,
продажей, дивидендами и т.п.) в других системах (например, для формирования графиков). Данные системы не поддерживают
импорт отчётов, которые предоставляет Альфа-Банк, что вынуждает нас вручную вносить все сделки. Для автоматизации ввода
сделок и был разработан данный проект. Надеюсь он будет полезен не только мне)

## Основные возможности

* **Отсутствие сервера:** проект работает без серверной части. Это означает, что личные данные остаются только на вашем
  устройстве.
* **Возможность работы без интернета.**
* **PWA:** для удобной работы на мобильных устройствах присутствует возможность установки данного сайта как
  веб-приложения на мобильное устройство.
* Возможность выбирать только те сделки, которые вы хотите импортировать в необходимую вам систему.
* Автоматический вычет налога при поступлении дивидендов.

## Поддерживаемые типы сделок

* Дивиденды
* Покупка и продажа акций

## Поддерживаемые форматы

* [Intelinvest](https://intelinvest.ru/app/#/settings/import)

## Добавление новых возможностей

Если вы не нашли необходимого вам формата или хотите, чтобы были добавлены необходимые вам возможности,
создавайте [issue](https://github.com/KyMback/alfa-tm-reports-converter/issues/new) с вашими пожеланиями.