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