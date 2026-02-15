export const getGenderText = (gender: string) => {
    switch (gender?.toLowerCase()) {
        case "male":
        case "мужской":
            return "Мужской";
        case "female":
        case "женский":
            return "Женский";
        default:
            return gender || "Не указан";
    }
};
