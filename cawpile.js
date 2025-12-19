document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const form = document.getElementById('cawpileForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('resultContainer');
    const errorMessage = document.getElementById('errorMessage');
    const score10Element = document.getElementById('score10');
    const score5Element = document.getElementById('score5');
    const scale10Radio = document.getElementById('scale10');
    const scale5Radio = document.getElementById('scale5');

    // Campos de entrada
    const inputs = [
        document.getElementById('characters'),
        document.getElementById('atmosphere'),
        document.getElementById('writing'),
        document.getElementById('plot'),
        document.getElementById('intrigue'),
        document.getElementById('logic'),
        document.getElementById('enjoyment')
    ];

    // Validar que la nota esté entre 1 y 10
    function validateInput(value) {
        const numValue = parseFloat(value);
        return !isNaN(numValue) && numValue >= 1 && numValue <= 10;
    }

    // Calcular la puntuación CAWPILE
    function calculateCAWPILE() {
        let sum = 0;
        let allValid = true;

        // Verificar que todos los campos sean válidos
        for (let i = 0; i < inputs.length; i++) {
            if (!validateInput(inputs[i].value)) {
                allValid = false;
                break;
            }
            sum += parseFloat(inputs[i].value);
        }

        if (!allValid) {
            errorMessage.classList.add('show');
            resultContainer.classList.remove('show');
            return;
        }

        // Ocultar mensaje de error si todo es válido
        errorMessage.classList.remove('show');

        // Calcular promedio sobre 10
        const average10 = sum / 7;

        // Calcular sobre 5 (dividiendo entre 2)
        const average5 = average10 / 2;

        // Mostrar resultados con 2 decimales
        score10Element.textContent = average10.toFixed(2);
        score5Element.textContent = average5.toFixed(2);

        // Mostrar el contenedor de resultados
        resultContainer.classList.add('show');

        // Destacar la puntuación seleccionada
        if (scale10Radio.checked) {
            score10Element.style.fontSize = "3.5rem";
            score5Element.style.fontSize = "3rem";
        } else {
            score10Element.style.fontSize = "3rem";
            score5Element.style.fontSize = "3.5rem";
        }
    }

    // Restablecer el formulario
    function resetForm() {
        form.reset();
        resultContainer.classList.remove('show');
        errorMessage.classList.remove('show');
        score10Element.style.fontSize = "3rem";
        score5Element.style.fontSize = "3rem";
    }

    // Asignar eventos
    calculateBtn.addEventListener('click', calculateCAWPILE);
    resetBtn.addEventListener('click', resetForm);

    // También permitir calcular con Enter
    form.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateCAWPILE();
        }
    });

    // Validación en tiempo real para cada campo
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (validateInput(this.value)) {
                this.style.borderColor = '#2ecc71';
            } else {
                this.style.borderColor = '#e74c3c';
            }
        });
    });

    // Ejemplo de notas para probar
    // Descomenta la siguiente línea para precargar con valores de ejemplo
    // loadExampleValues();

    function loadExampleValues() {
        document.getElementById('characters').value = 8;
        document.getElementById('atmosphere').value = 9;
        document.getElementById('writing').value = 7.5;
        document.getElementById('plot').value = 8;
        document.getElementById('intrigue').value = 9.5;
        document.getElementById('logic').value = 7;
        document.getElementById('enjoyment').value = 10;

        // Actualizar estilos de los campos
        inputs.forEach(input => {
            input.style.borderColor = '#2ecc71';
        });
    }
});