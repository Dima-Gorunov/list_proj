const bcrypt = require("bcryptjs");

const { SECRET_ADMIN_STRING } = require("../constant");

class SecretService {
    async validateSecretAdminString(adminString) {
        try {
            if (!adminString) {
                return false;
            }
            const secretHash = await bcrypt.hash(SECRET_ADMIN_STRING, 10);
            // Сравниваем с хешем
            const isValid = bcrypt.compare(adminString, secretHash);
            return isValid;
        } catch (error) {
            console.error("Secret validation error:", error);
            return false;
        }
    }
}

module.exports = new SecretService();
