export function removeHashParam(paramName: string): string {
    const url = new URL(window.location.href);
    const hash = url.hash.substring(1); // Убираем #

    if (!hash) {
        return url.toString();
    }

    // Разделяем путь и параметры внутри hash
    const [route, queryString] = hash.includes("?") ? hash.split("?") : [hash, ""];

    if (!queryString) {
        return url.toString(); // Нет параметров для удаления
    }

    // Парсим параметры
    const params = new URLSearchParams(queryString);

    // Удаляем нужный параметр
    params.delete(paramName);

    // Собираем новый hash
    const newParams = params.toString();
    const newHash = newParams ? `#${route}?${newParams}` : `#${route}`;

    // Обновляем hash в URL
    url.hash = newHash;

    return url.toString();
}

/**
 * Удаляет параметр из hash-части URL и обновляет браузерную историю
 * @param paramName - Название параметра для удаления
 */
export function removeHashParamAndNavigate(paramName: string): void {
    const newUrl = removeHashParam(paramName);

    window.history.replaceState(null, "", newUrl);
}
