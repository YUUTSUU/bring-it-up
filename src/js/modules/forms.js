export default class Forms {
  constructor(forms, inputs, url) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll(inputs);
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так..."
    };
    this.path = url;
  }

  checkMail() {
    const mailInputs = document.querySelectorAll("[name='email']");

    mailInputs.forEach(input => {
      input.addEventListener("keypress", (event) => {
        if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
          event.preventDefault();
        }
      });
    });
  }

  maskPhone() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      
      if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
          let range = elem.createTextRange();

          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
      }
    };

    function createMask(event) {
      let matrix = '+1 (___) ___-____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
          val = def;
      }

      this.value = matrix.replace(/./g, function(a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
          if (this.value.length == 2) {
              this.value = '';
          }
      } else {
          setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll("[name='phone']");

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
  }

  async postData (url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json"
      }
    });
    return await res.json();
  }

  init() {
    this.checkMail();
    this.maskPhone();

    this.forms.forEach(form => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const statusMessage = document.createElement("div");
        statusMessage.style.cssText = `
          margin-top: 15px;
          font-size: 18px;
          color: red;
        `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading

        const formData = new FormData(form);
        const data = JSON.stringify(Object.fromEntries(formData.entries()));

        this.postData(this.path, data)
          .then(res => {
            console.log(res)
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.inputs.forEach(input => {
              input.value = "";
            });
            setTimeout(() => {
              statusMessage.remove();
            }, 3000);
          });
      });
    });
  }
}