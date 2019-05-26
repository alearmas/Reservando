var Reserva = function(fecha, cantidad, precio, codigoDescuento) {
    this.fecha = fecha;
    this.dia = this.fecha.getDay();
    this.horario = this.fecha.getHours();
    this.cantPersonas = cantidad;
    this.precioPersona = precio;
    this.codigo = codigoDescuento;
    this.precioBase = this.cantPersonas * this.precioPersona;
    this.adicionalesPorHorario = function() {
      if (this.horario == 13 || this.horario == 14 || this.horario == 20 || this.horario == 21) {
        return calcularPorcentaje(5, this.precioBase);
      } else {
        return 0;
      }
    }
    this.adicionalesPorDia = function() {
      if (this.dia == 5 || this.dia == 6 || this.dia == 7) {
        return calcularPorcentaje(10, this.precioBase);
      } else {
        return 0;
      }
    }
    this.descuentosPorGrupo = function() {
      if (this.cantPersonas >= 4 && this.cantPersonas <= 6) {
        return calcularPorcentaje(5, this.precioBase);
      } else if (this.cantPersonas >= 7 && this.cantPersonas <= 8) {
        return calcularPorcentaje(10, this.precioBase);
      } else if (this.cantPersonas > 8) {
        return calcularPorcentaje(15, this.precioBase);
      } else {
        return 0;
      }
    }
    this.descuentosPorCodigo = function() {
      if (this.codigo == 'DES15') {
        return calcularPorcentaje(15, this.precioBase);
      } else if (this.codigo == 'DES200') {
        return 200;
      } else if (this.codigo == 'DES1') {
        return this.precioPersona;
      } else {
        return 0;
      }
    }
    this.precioFinal = function() {
      return this.precioBase + this.adicionalesPorHorario() + this.adicionalesPorDia() - this.descuentosPorGrupo() - this.descuentosPorCodigo();
    }
  }

  
  var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
  var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
  var reserva3 = new Reserva (new Date(2019, 3, 21, 12, 30), 9, 500, 'DES15');
  var reserva4 = new Reserva (new Date(2019, 8, 14, 21, 00), 4, 300, '');
  
  function calcularPorcentaje(descuento, precioBase) {
    return Math.round((descuento * precioBase) / 100);
  }