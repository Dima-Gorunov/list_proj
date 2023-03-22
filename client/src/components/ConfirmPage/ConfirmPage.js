import React from 'react';

const ConfirmPage = (props) => {
    return (
        <div>
            <div>
                Подтвердите почту
            </div>
            <div>
                Вам выслали ссылку для подтверждения на {props.User.Email}
            </div>
            <div>
                Если почта не бодет подтверждена втечение 30мин - аккаунт автоматически удалится
            </div>
        </div>
    );
};

export default ConfirmPage;