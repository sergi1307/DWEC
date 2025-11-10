// Capturem el formulari de socis

document.getElementById("formulario_socios").addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("Submit realitzat.", document.getElementById("formulario_socios"));

  const nom = document.getElementById("nombre").value;
  const dni = document.getElementById("dni").value;
  const mail = document.getElementById("mail").value;
  const telefono = document.getElementById("telefono").value;

  const datos = {
    nom: nom,
    dni: dni,
    correo_electronico: mail,
    telefono: telefono
  };

  fetch("http://localhost/socis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear el socio");
      }

      console.log("Resposta del servidor: ", data);
      alert("Dades enviades correctament.");
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert("Error al enviar les dades! - " + error.message);
    })
});

// // Añadimos campo extra

// document.getElementById('tipo').addEventListener('change', function() {
//     const campoExtra = document.getElementById('campoExtra');
//     campoExtra.innerHTML = '';

//     if (this.value === 'administrador') {
//         const label = document.createElement('label');
//         label.textContent = 'Cargo: ';
//         campoExtra.appendChild(label);
//         campoExtra.appendChild(document.createElement('br'));

//         const radioAdmin = document.createElement('input');
//         radioAdmin.type = 'radio';
//         radioAdmin.id = 'cargo_admin';
//         radioAdmin.name = 'cargo';
//         radioAdmin.value = 'Administrador';
//         radioAdmin.required = true;
//         radioAdmin.classList.add('radio-custom');

//         const labelAdmin = document.createElement('label');
//         labelAdmin.setAttribute('for', 'cargo_admin');
//         labelAdmin.textContent = 'Administrador';

//         const radioAyudante = document.createElement('input');
//         radioAyudante.type = 'radio';
//         radioAyudante.id = 'cargo_ayudante';
//         radioAyudante.name = 'cargo';
//         radioAyudante.value = 'Ayudante';
//         radioAyudante.required = true;
//         radioAyudante.classList.add('radio-custom');

//         const labelAyudante = document.createElement('label');
//         labelAyudante.setAttribute('for', 'cargo_ayudante');
//         labelAyudante.textContent = 'Ayudante';

//         campoExtra.appendChild(radioAdmin);
//         campoExtra.appendChild(labelAdmin);
//         campoExtra.appendChild(document.createElement('br'));
//         campoExtra.appendChild(radioAyudante);
//         campoExtra.appendChild(labelAyudante);
//         campoExtra.appendChild(document.createElement('br'));
//         campoExtra.appendChild(document.createElement('br'));
//     }
// })