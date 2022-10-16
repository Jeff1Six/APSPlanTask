document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

$(document).ready(function () {
    if(window.localStorage.getItem('name_user')){
        avancaTela()
    }
    if ($('#nomeLogin').val() == '') {
        $('#AvancaLogin').hide()
    }
});

$('#nomeLogin').keydown(function (e) {
    if ($('#nomeLogin').val() == '' || $('#nomeLogin').val().length < 3) {
        $('#AvancaLogin').hide()
    } else {
        $('#AvancaLogin').show()
    }
})
$('#AvancaLogin').click(function (e) {
    e.preventDefault()
    window.localStorage.setItem('name_user',$('#nomeLogin').val())
    avancaTela()
})

function avancaTela(){
    window.location.href = './pages/main.html'
}