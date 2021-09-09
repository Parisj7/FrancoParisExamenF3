import React from "react";
import Datos from "./components/data.json"

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
       id: "" ,
       historia: "",
       opcionA: "",
       opcionB: "",
       contador: 1,
       historial : [],
       opcion: ""
      };
  }
  componentDidMount(){
    this.setState({
      id : Datos[0].id,
      historia : Datos[0].historia,
      opcionA  : Datos[0].opciones.a,
      opcionB  : Datos[0].opciones.b
    });
  }

  clickBoton(opcion) {
    let array = this.state.historial 
    array.push(opcion)
    this.setState({historial: array})
    this.setState({opcion: opcion})
    console.log(this.state.historial)
    
    if(this.state.contador < 5){
      let contadororiginal= this.state.contador + 1 
      this.setState({contador: contadororiginal})
      this.setState({id:contadororiginal+opcion})

    } else {
      alert("Fin.")
      this.setState({
        id : Datos[0].id,
        historia : Datos[0].historia,
        opcionA  : Datos[0].opciones.a,
        opcionB  : Datos[0].opciones.b,
        contador : 1,
        historial : []
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    
    let position = Datos.find(element => element.id == this.state.id )

    if(prevState.id !== position.id ){
  
      this.setState({
      id : position.id,
      historia : position.historia,
      opcionA  : position.opciones.a,
      opcionB  : position.opciones.b
    })
  }
  }

  render(){

    let arrayHistorial = this.state.historial
    let listHistorial = arrayHistorial.map((opcion) => <li>{opcion}</li>)

    return( 
      
      <div className="layout">

        <h1 className = "historia">{this.state.historia}</h1>

        <div className = "opciones">

          <div className = "opcion">

            <button onClick={()=>this.clickBoton("a")} className = "botones"> A </button>
            <h3 className = "opcion"> {this.state.opcionA} </h3>

          </div>

          <div className = "opcion">

            <button onClick={()=>this.clickBoton("b")} className = "botones"> B </button>
            <h3 className = "opcion"> {this.state.opcionB} </h3>

          </div>

        </div>

        <div className = "recordatorio">

          <h3> Seleccion anterior: {this.state.opcion} </h3>
          <h3> Historial de opciones: </h3>
          <ul>{listHistorial}</ul>
          
        </div>

      </div>
    )}
}

export default App;