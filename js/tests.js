let expect = chai.expect;

/* Testeo de la función reservarHorario(horario)
 * Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
 * Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.
 * Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.*/

describe('Testing de la función reservarHorario(horario)', function () {
    it ('se elimina el horario del array', function () {
        let restoPrueba = listado.restaurantes[0];

        restoPrueba.reservarHorario('15:30');

        expect(restoPrueba.horarios[0]).to.equal('13:00');
        expect(restoPrueba.horarios[1]).to.equal('18:00');
        expect(restoPrueba.horarios.length).to.equal(2);
    })

    it ('el array se mantiene igual', function () {
        let restoPrueba = listado.restaurantes[1];

        restoPrueba.reservarHorario('17:30');

        expect(restoPrueba.horarios[0]).to.equal('12:30');
        expect(restoPrueba.horarios[1]).to.equal('14:30');
        expect(restoPrueba.horarios[2]).to.equal('15:00');
        expect(restoPrueba.horarios.length).to.equal(3);
    })

    it ('el array se mantiene igual cuando intentan reservar sin parametros', function () {
        let restoPrueba = listado.restaurantes[2];

        restoPrueba.reservarHorario();

        expect(restoPrueba.horarios[0]).to.equal('11:30');
        expect(restoPrueba.horarios[1]).to.equal('12:00');
        expect(restoPrueba.horarios[2]).to.equal('22:30');
        expect(restoPrueba.horarios.length).to.equal(3);
    })
})

/* Testeo de la función obtenerPuntuacion()
 * Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
 * Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.*/

describe ('Testing de la función obtenerPuntuacion()', function () {
    it ('Puntuacion de un restaurante debe promediarse correctamente', function () {
        expect(listadoDeRestaurantes[0].obtenerPuntuacion()).to.be.eql(7.4)
        expect(listadoDeRestaurantes[6].obtenerPuntuacion()).to.be.eql(6.7)
    })

    it ('Puntuacion == 0, si el restaurante no tiene calificaciones', function () {
        var restoPrueba = new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "img/pasta3.jpg", []);
    expect(restoPrueba.obtenerPuntuacion()).to.be.eql(0);
    })
})

//Testeo de la función calificar()

describe("Testing de la función calificar()", function(){
    it("Calculamos nueva puntuacion",function(){
      var restoPrueba = new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "img/pasta3.jpg", [7,9]);
      expect(restoPrueba.obtenerPuntuacion()).to.be.eql(8);
    })
    it("Calculamos una calificacion invalida", function(){
      var restoPrueba = new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "img/pizza1.jpg", [8,6]);
      expect(restoPrueba.obtenerPuntuacion("s")).to.be.eql(7);
    })
    it("Calculamos una calificacion igual a cero", function(){
      var restoPrueba = new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "img/pizza1.jpg", [8,6]);
      expect(restoPrueba.obtenerPuntuacion(0)).to.be.eql(7);
    })
  })

//Testeo de la función buscarRestaurante(id)

describe('Testing de la función buscarRestaurante()', function () {
    it('Debe corresponder el id con el nombre del restaurante', function () {
        const idRestaurante = listado.restaurantes[4].id;

        expect(idRestaurante).to.equal(5);
    })
})

//Testeo de la función obtenerRestaurante()

describe('Testing de la función obtenerRestaurante()', function () {
    it('Retorno de un restaurante de acuerdo a los filtros', function () {
        let restFiltrado = listado.obtenerRestaurantes('Asiática', 'Berlín', '12:00');

        expect(restFiltrado[0].nombre).to.eql("Jolly");
    })
})

//Testing de la guia 3, sobre la nueva funcionalidad de reserva en la pagina.

describe('Testeo del precio base y precio final', function() {
    beforeEach(function() {
      var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
      var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 30), 6, 550, "DES200");
      var reserva3 = new Reserva (new Date(2019, 1, 28, 12, 30), 7, 400, 'DES15');
      var reserva4 = new Reserva (new Date(2019, 10, 17, 21, 00), 2, 300, '');
    })
    it('Verificacion de adicionales por dia', function() {
      expect(reserva1.adicionalesPorDia()).to.be.equal(calcularPorcentaje(10, reserva1.precioBase));
      expect(reserva2.adicionalesPorDia()).to.be.equal(0);
      expect(reserva3.adicionalesPorDia()).to.be.equal(0);
      expect(reserva4.adicionalesPorDia()).to.be.equal(calcularPorcentaje(10, reserva4.precioBase));
    })
    it('Verificacion de adicionales por horario', function() {
      expect(reserva1.adicionalesPorHorario()).to.be.equal(0);
      expect(reserva2.adicionalesPorHorario()).to.be.equal(0);
      expect(reserva3.adicionalesPorHorario()).to.be.equal(0);
      expect(reserva4.adicionalesPorHorario()).to.be.equal(60);
    })
    it('Verificacion de descuentos por código', function() {
      expect(reserva1.descuentosPorCodigo()).to.be.equal(reserva1.precioPersona);
      expect(reserva2.descuentosPorCodigo()).to.be.equal(400);
      expect(reserva3.descuentosPorCodigo()).to.be.equal(calcularPorcentaje(15, reserva3.precioBase));
      expect(reserva4.descuentosPorCodigo()).to.be.equal(0);
    })
    it('Verificacion de descuentos por grupo', function() {
      expect(reserva1.descuentosPorGrupo()).to.be.equal(calcularPorcentaje(10, reserva1.precioBase));
      expect(reserva2.descuentosPorGrupo()).to.be.equal(0);
      expect(reserva3.descuentosPorGrupo()).to.be.equal(calcularPorcentaje(15, reserva3.precioBase));
      expect(reserva4. descuentosPorGrupo()).to.be.equal(calcularPorcentaje(5, reserva4.precioBase));
    })
    it('Testing de precio base', function() {
      expect(reserva1.precioBase).to.be.equal(2400);
      expect(reserva2.precioBase).to.be.equal(300);
      expect(reserva3.precioBase).to.be.equal(500 * 9);
      expect(reserva4.precioBase).to.be.equal(300 * 4);
    })
    it('Testing de precio final', function() {
      var reserva3Adicional = 0;
      var reserva3Desc = calcularPorcentaje(15, reserva3.precioBase) + calcularPorcentaje(15, reserva3.precioBase);
      var precioFinal3 = (500 * 9) + reserva3Adicional - reserva3Desc;
  
      var reserva4Adicional = calcularPorcentaje(10, reserva4.precioBase) + 60;
      var reserva4Desc = calcularPorcentaje(5, reserva4.precioBase);
      var precioFinal4 = (300 * 4) + reserva4Adicional - reserva4Desc;
  
      expect(reserva1.precioFinal()).to.be.equal(2450);
  
      expect(reserva2.precioFinal()).to.be.equal(100);
      expect(reserva3.precioFinal()).to.be.equal(precioFinal3);
      expect(reserva4.precioFinal()).to.be.equal(precioFinal4);
    })
  })