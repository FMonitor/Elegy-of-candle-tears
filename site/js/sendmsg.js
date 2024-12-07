document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 防止表单默认提交

    const formData = {
        name: document.getElementById('contact-modal-name').value,
        email: document.getElementById('contact-modal-email').value,
        phone: document.getElementById('contact-modal-phone').value,
        message: document.getElementById('contact-modal-message').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('邮件发送成功！');
            document.getElementById('contactForm').reset();
        } else {
            alert('邮件发送失败，请稍后重试。');
        }
    } catch (error) {
        alert('提交时发生错误：' + error.message);
    }
});
