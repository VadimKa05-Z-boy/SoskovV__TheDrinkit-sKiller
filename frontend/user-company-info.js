/*const linkRes = document.querySelector('.resourse__button')
const inputName = document.querySelector('#input--name');

const savedName = localStorage.getItem('name');
if (savedName !== null) {
    inputName.value = savedName;
}

inputName.addEventListener('blur',()=>{
    //if(inputName.value ==='') ; Тут проблемка с тем что нужно обдумать ....

    //if(document.querySelector('.blockRename')) return;

    //let blockRename = document.createElement('div');
    //let saveButton = document.createElement('button');
    //saveButton.textContent = `Сохранисть изменения`    

    //inputName.after(blockRename)
    //blockRename.appendChild(saveButton)

    //saveButton.addEventListener('focus',()=>{
        localStorage.setItem('name', inputName.value)
        //blockRename.remove()
        //console.log(localStorage.getItem('name'))-проверка на то что сохраняет фокус
    //})
})

const inputMail = document.querySelector('#input--mail')

const savedMail = localStorage.getItem('mail')
if(savedMail !== null){
    inputMail.value = savedMail
}

inputMail.addEventListener('blur', ()=>{
    localStorage.setItem('mail', inputMail.value)
})

const inputTel = document.querySelector('#input--tel')

const savedTel = localStorage.getItem('tel')
if(savedTel !== null){
    inputTel.value = savedTel
}

inputTel.querySelector('blur', ()=>{
    localStorage.setItem('tel', inputTel.value)
})

// Кнопк Ресурсы - пока не актуально 


linkRes.addEventListener('click',()=>{
    const divRes = document.createElement('div');

    const linkTg = document.createElement('a');
    const linkVk = document.createElement('a');
    const linkMax = document.createElement('a');

    linkTg.textContent = 'telegram';
    linkVk.textContent = 'vkontakte';
    linkMax.textContent = 'max';

    linkTg.href = `https://t.me/Vadim_ka5`;
    linkMax.href = `/`;
    linkVk.href = `/`;

    // Добавляем ссылки в контейнер
    divRes.appendChild(linkTg);
    divRes.appendChild(linkVk);
    divRes.appendChild(linkMax);

    // Вставляем контейнер после кнопки
    linkRes.after(divRes);
})*/

// user-company-info.js
const inputName = document.querySelector('#input--name');
const inputMail = document.querySelector('#input--mail');
const inputTel = document.querySelector('#input--tel');

// Загрузка данных
[inputName, inputMail, inputTel].forEach(input => {
  const key = input.id.replace('input--', '');
  const saved = localStorage.getItem(key);
  if (saved) input.value = saved;
});

// Сохранение при потере фокуса
[inputName, inputMail, inputTel].forEach(input => {
  input.addEventListener('blur', () => {
    const key = input.id.replace('input--', '');
    localStorage.setItem(key, input.value);
  });
});