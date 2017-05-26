var app =
    {
        inicio: function () {
            this.iniciaBotones();
            this.iniciaFastclick();
            this.iniciaHammer();
        },

        iniciaBotones: function () {
            var botonClaro = document.querySelector('#claro');
            var botonOscuro = document.querySelector('#oscuro');

            botonClaro.addEventListener('click', this.ponloClaro, false);
            botonOscuro.addEventListener('click', this.ponloOscuro, false);
        },

        iniciaFastclick: function () {
            FastClick.attach(document.body);
        },

        iniciaHammer: function () {
            var zona = document.getElementById('zona-gestos'); //zona en la q actua hammer
            var hammertime = new Hammer(zona);

            hammertime.get('pinch').set({ enable: true });
            hammertime.get('rotate').set({ enable: true });

            //hay q sacar css despues de animar, pero despues q termine animación, con este código se logra.
            zona.addEventListener('webkitAnimationEnd', function (e) {
                zona.className = '';
            });

            hammertime.on('doubletap', function (ev) {
                zona.className = 'doubletap';
            });

            hammertime.on('press', function (ev) {
                zona.className = 'press';
            });

            hammertime.on('swipe', function (ev) {
                var clase = undefined;
                direccion = ev.direction;

                if (direccion == 4) { clase = 'swipe-derecha' };
                if (direccion == 2) { clase = 'swipe-izquierda' };
            
                zona.className = clase;

            });


            hammertime.on('rotate', function (ev) {
                var umbral = 25;
                if (ev.distance > umbral) zona.className = 'rotate';
            });

        },


        ponloClaro: function () {
            document.body.className = 'claro';
        },

        ponloOscuro: function () {
            document.body.className = 'oscuro';
        },

    };

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        app.inicio();
    }, false);
}

