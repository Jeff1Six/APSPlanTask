$(document).ready(function () {
    $('#Nome_user').html(window.localStorage.getItem('name_user'))
    for (let index = 0; index < 25; index++) {
        $('<option>', {
            value: index
        }).html(index < 10 ? '0' + index : index).appendTo('#HoraPlanta')

    }
    for (let index = 0; index < 60; index++) {
        $('<option>', {
            value: index
        }).html(index < 10 ? '0' + index : index).appendTo('#MinutoPlanta')

    }
    montaPlantas()
});

$('.addPlanta').click(function (e) {
    e.preventDefault()
    $('.modalAddPlanta').modal('show')
})

$('#SalvarPlanta').click(function (e) {
    e.preventDefault()
    $('.inputAddPlanta').each(function (ind, ele) {
        if ($(ele).val() == '' || $(ele).val() == 'Hora' || $(ele).val() == 'Minuto') {
            $(ele).css('border', '1px solid red')
            $('.alertForm').show()
            setTimeout(() => {
                $('.alertForm').hide()
            }, 4500);
        } else {
            $(ele).css('border', '1px solid #ced4da')
        }
    });
    if ($('.inputAddPlanta').val() !== '') {
        salvarJSONPlanta()
    }
})

function salvarJSONPlanta() {
    var plantaJSON = getFormData($('form').serializeArray())
    file = document.querySelector('#formFile').files[0]
    getBase64(file)
    setTimeout(() => {
        plantaJSON.base64 = base64file;
        var hora = $('#HoraPlanta').val() < 10 ? '0' + $('#HoraPlanta').val() : $('#HoraPlanta').val()
        var minuto = $('#MinutoPlanta').val() < 10 ? '0' + $('#MinutoPlanta').val() : $('#MinutoPlanta').val()
        plantaJSON.horas = hora + ':' + minuto
        if (window.localStorage.getItem('plantas_add')) {
            var array_item = JSON.parse(window.localStorage.getItem('plantas_add'))
            array_item.push(plantaJSON)
            window.localStorage.setItem('plantas_add', JSON.stringify(array_item))
        } else {
            window.localStorage.setItem('plantas_add', JSON.stringify([plantaJSON]))
        }
        montaPlantas()
    }, 600);

}

var base64file;
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        base64file = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function getFormData(form) {
    var unindexed_array = form;
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function montaPlantas() {
    $('.modalAddPlanta').modal('hide')
    var plantas = JSON.parse(window.localStorage.getItem('plantas_add'))
    $('.plantasCriadas').empty()
    if (plantas) {
        $.each(plantas, function (i, e) {
            $('<div>', { class: 'cardTipoPlanta' }).html(`
            <div class="card cardTipoPlanta">
                <img src="${e.base64}" class="card-img-top"> 
                <div class="card-body text-center">
                    <h5 class="card-title">${e.titulo}</h5>
                    <h6 class="card-text fw-light">${e.descricao}</h6>
                    <p class="fw-bold mb-0">HORA: <span style="color:var(--bs-teal)">${e.horas}</span></p>
                </div>
            </div>
            `).appendTo('.plantasCriadas')
        });
    } else {
        $('<div>', { class: 'alert alert-danger text-center mt-2',style:'margin-left:5%;width:90%;wid' }).html(`
            Nenhuma Planta Registrada
            `).appendTo('.plantasCriadas')
    }

}


$('#btn_logoff').click(function (e) {
    e.preventDefault()
    window.localStorage.clear()
    window.location.href = '../index.html'
})