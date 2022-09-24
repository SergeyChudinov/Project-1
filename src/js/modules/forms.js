import checkNumInputs from './checkNumInputs';

const forms = () => {
    console.log(123);
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы с вами саяжемся!',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        // return await res.text();
        return await res.json();
    };
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            console.log(formData);
            console.log(12345);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(json);

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.textContent = message.success;
                }).catch(() => {
                    statusMessage.textContent = message.failure;
                }).finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })

            // postData('assets/server.php', formData)
            //     .than(res => {
            //         console.log(res);
            //         statusMessage.textContent = message.success;
            //     })
            //     .catch(() => statusMessage.textContent = message.failure)
            //     .finally(() => {
            //         // form.reset();
            //         clearInputs();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 5000);
            //     });
        });
    });
};
export default forms;