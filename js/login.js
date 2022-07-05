class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
        localStorage.removeItem("auth")

		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});

			console.log('error:' + error)

			if (error == 0) {
				//let usuario = document.getElementById("username").value;
				//let senha = document.getElementById("password").value;

                //self.getToken(usuario, senha);
				localStorage.setItem("auth", '1');

				this.form.submit();
			}
            else{
				alert('TT E1');
                localStorage.removeItem("auth");
            }
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`Campo ${field.previousElementSibling.innerText} inválido`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 6) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} deve ter no mínimo 6 caracteres`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
            localStorage.removeItem("auth")
		}
	}

	getToken(usuario, senha) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");    
		myHeaders.append("user-agent", "Mozilla/5.0");
		
		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: JSON.stringify({"email": usuario, "password": senha})
		};

		let url = 'http://127.0.0.1:8081/user/login/';
		fetch(url, requestOptions)
		.then((response) => response.json())
		.then(function(data) {
			localStorage.setItem("auth", data.access_token);
			return data.access_token;
		})
		.catch(function(erro) {
			localStorage.setItem("auth", '');
			console.log(erro);
			alert('crash test dumyes');
			return ''
		});
	}	
}

const form = document.querySelector(".loginForm");
if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}
